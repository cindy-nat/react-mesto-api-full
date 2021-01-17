export const AUTH_URL = 'http://localhost:3000';


const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Произошла ошибка ${res.status}`);
  }
  return res.json();
}

export const register = (email, password) => {
  return fetch(`${AUTH_URL}/signup` , {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})})
    .then(response => getResponseData(response));
  }

  export const authorize = (email, password) => {
  return fetch(`${AUTH_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})})
      .then(response => getResponseData(response));
  }

  export const checkTokenValidity = (token) => {
  return fetch(`${AUTH_URL}/users/me`,{
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
    .then(response => getResponseData(response));
  }


