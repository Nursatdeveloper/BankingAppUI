async function getRequest(url:string, token?:string){
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + token  
        }
      });
      if (response.ok === true) {     
          return JSON.stringify(response)
      }
      else
          getRequest(url)
}

export default getRequest