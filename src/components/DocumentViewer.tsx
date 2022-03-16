import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import API_URL from '../api_url';
import Document from '../models/Document';

const DocumentViewer = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(()=> {
    const id = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    const url = `${API_URL}/document/get-all-documents/${id}`;
    fetch(url, {
      method:"GET",
      headers:{
        'Accept':'application/json',
        'Authorization': `${token}`
      }
    }).then(response => response.json())
    .then(result => setDocuments(result))
    .catch(error => console.log(error))
  })

  function downloadDocument(documentName:string){
    const id = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    const url = `${API_URL}/document/find-pdf-document`;

    const FindDocumentCommand = {
      userId:id,
      documentName:documentName
    }

    fetch(url,{
      method:"POST",
      headers:{
        'Accept':'application/pdf',
        'Content-Type':'application/json',
        'Authorization':`${token}`
      },
      body: JSON.stringify(FindDocumentCommand)
    }).then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${documentName}.pdf`)
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    }).catch(error => console.log(error))
  }

  return (
    <DocumentViewerWrapper>
      <DocumentViewierHeader>
        Документы
      </DocumentViewierHeader>
      <DocumentViewerBody>
        {documents.map((document, i) => 
          <div className='document_link' key={++i} onClick={()=> downloadDocument(document.documentName)}>
            {i+1}. {document.documentName} {document.documentType}
          </div>)}
        {documents.length === 0 ? <div className='no-documents'>Пока нет никаких документов!</div> : null}
      </DocumentViewerBody>
    </DocumentViewerWrapper>
  )
}

export default DocumentViewer

const DocumentViewerWrapper = styled.div`
  width:30%;
  background-color:#F5F7F9;
  z-index:4;
  position:relative;
`

const DocumentViewierHeader = styled.div`
  font-size:22px;
  color:#4d4d4d;
  text-align:center;
  padding-top:15px;
  padding-bottom:15px;
  border-bottom:2px solid #f2f2f2;
  position:relative;
  z-index:3;
  background-color:#F5F7F9;
  margin-bottom:10px;
`

const DocumentViewerBody = styled.div`
  .document_link{
    font-size:15px;
    padding-top:8px;
    padding-bottom:8px;
    padding-left:20px;
    text-decoration:underline;
    color:#4d4d4d;
    :hover{
      color:purple;
      cursor:pointer;
    }
  }

  .no-documents{
    margin-top:20px;
    text-align:center;
  }
`