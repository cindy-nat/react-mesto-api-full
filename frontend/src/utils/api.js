export const BASE_URL = 'http://api.cindy.students.nomoredomains.monster';
// export const BASE_URL = 'http://localhost:3000';


const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Произошла ошибка ${res.status}`);
  }
  return res.json();
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup` , {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})})
    .then(response => getResponseData(response));
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})})
    .then(response => getResponseData(response));
}

  //запрос информации с сервера о данных пользователя
export const getInfo = () => {
return fetch(`${BASE_URL}/users/me`, {
  headers: {
    "Content-Type": "application/json"
  },
  credentials: 'include',})
  .then(getResponseData);
  }

  //отправка новых данных о пользователе на сервер
export const setInfo = ({name, about}) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },      credentials: 'include',
      body: JSON.stringify({
        name,
        about
      })
    })
  .then(getResponseData);
  }

  //Изменение аватарки на сервере
export const setAvatar = (avatarLink) => {
    return fetch(`${BASE_URL}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },      credentials: 'include',
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
      .then(getResponseData);
  }

  //запрос данных с сервера для получения карточек
export const getCards = () => {
    return fetch(`${BASE_URL}/cards`, {
      headers: {
        "Content-Type": "application/json"
      },      credentials: 'include',})
      .then(getResponseData);
  }

  //сбор всех данных для загрузки страницы
export const getAllData = () => {
    return Promise.all([getInfo(), getCards()]);
  }

  //добавление карточки на сервер
export const addCard = (data) => {
    return fetch(`${BASE_URL}/cards `, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(getResponseData);
  }

  //удаление карточки с сервера
export const deleteCard = (id) => {
    return fetch(`${BASE_URL}/cards/${id} `, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },    })
      .then(getResponseData);
  }

  //Установка лайка
 const addLike = (cardId) => {
    return fetch(`${BASE_URL}/cards/likes/${cardId} `, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
    })
  }

//удаление лайка с сервера
 const removeLike = (cardId) => {
    return fetch(`${BASE_URL}/cards/likes/${cardId} `, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
    })
  }

export const changeLikeCardStatus = (cardId, isLiked) => {
  if(!isLiked) {
      return removeLike(cardId).then(getResponseData);
    }
  else {
    return addLike(cardId).then(getResponseData)
  }
  }

  export const logout = () => {
    return fetch(`${BASE_URL}/logout `, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(getResponseData);
  }
