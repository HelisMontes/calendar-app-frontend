const urlBase = process.env.REACT_APP_API_URL;

const fetchSinToken = (endpoint:string, data:object, method:string = 'GET') => {
  const url:string = `${urlBase}/${endpoint}`  // http://localhost:4000/api
  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch (url, {
      method,
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
}

export{
  fetchSinToken
}