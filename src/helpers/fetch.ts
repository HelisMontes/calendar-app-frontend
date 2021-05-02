const urlBase = process.env.REACT_APP_API_URL;

const fetchSinToken = (endpoint: string, data: object, method: string = 'GET') => {
  const url: string = `${urlBase}/${endpoint}`  // http://localhost:4000/api
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

const fetchConToken = (endpoint: string, data?: object, method: string = 'GET') => {
  const url: string = `${urlBase}/${endpoint}`  // http://localhost:4000/api
  const token: string = localStorage.getItem('token') || ''
  console.log(process.env)
  if (method === 'GET') {
    return fetch(url,{
      method,
      headers:{
        'x-token': token
      }
    });
  } else {
    return fetch (url, {
      method,
      headers: {
        'Content-type' : 'application/json',
        'x-token': token
      },
      body: JSON.stringify(data)
    });
  }
}

export{
  fetchSinToken,
  fetchConToken
}