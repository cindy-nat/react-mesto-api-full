import React from "react";
import {Route, Redirect, Switch, useHistory} from "react-router-dom";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';
import Header from "./Header";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteSubmitPopupOpen, setIsDeleteSubmitPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false, link:'', name:''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [cardIdToDelete, setCardIdToDelete] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [infoTooltipIsOpened, setInfoTooltipIsOpened] = React.useState(false);
  const history = useHistory();

  //проверка токена
  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if(jwt){
      auth.checkTokenValidity(jwt)
      .then(data=>{
        if(data) {
          setEmail(data.data.email);
          setLoggedIn(true);
          history.push("/");
        }
      })
    }
    else {
      localStorage.removeItem('jwt');
    }
  }

  // выход из пользователя
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
      setLoggedIn(false);
      history.push('/sign-in')
  }

  //вход в пользователя
  const handleSignIn = (email,password) => {
    auth.authorize(email, password)
      .then(data => {
        if(data.token) {
          localStorage.setItem('jwt', data.token);
          history.push("/");
          setLoggedIn(true);
        }
      })
      .catch(err=>{
        setInfoTooltipIsOpened(true);
        console.log(err);
      });
  };

  // регистрация пользователя
  const handleRegister = (email, password) => {
    auth.register(email, password)
      .then(data => {
        if (data) {
          setInfoTooltipIsOpened(true);
        }
      })
      .catch(err => console.log(err));
  }

  //получение данных
  React.useEffect(()=>{
    Promise.all([api.getInfo(), api.getCards()])
      .then(([userInfo, cards])=>{
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch(err => console.log(err))},[]);

  React.useEffect(()=>{
    tokenCheck();
  },[loggedIn]);

  //функции для установки состояния открытого попапа
    function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }
    function handleEditProfileClick (){
      setIsEditProfilePopupOpen(true);
  }
    function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick({name, link}) {
      setSelectedCard({isOpen:true, name:name, link: link})
  }

  //функция закрытия попапов
  function closeAllPopups () {
      setIsEditAvatarPopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsDeleteSubmitPopupOpen(false);
      setSelectedCard({isOpen:false, link: "",name: ""});
      setCardIdToDelete(null);
      setInfoTooltipIsOpened(false)
  }

  //функция отвечающая за апдейт данных у пользователя
   function handleUpdateUser({name, about}) {
   setLoading(true);
    api.setInfo({name, about})
      .then((info) => {
      setCurrentUser(info);
      closeAllPopups();
  })
      .catch(err => console.log(err))
      .finally(()=>setLoading(false))
   }

   //функция для обновления аватара на сервере
   function handleUpdateAvatar (avatarLink) {
     setLoading(true);
     api.setAvatar(avatarLink)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch(err => console.log(err))
       .finally(()=>setLoading(false))
   }

   //функция для лайка карточек
  function handleCardLike (card) {
    const isLiked = card.likes.some(like => like._id ===currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard)=>{
      const newCards = cards.map(cardItem=>cardItem._id === card._id ? newCard : cardItem);
      setCards(newCards);
    })
      .catch(err => console.log(err))
  }

  //функция для открытия попапа подтверждения удаления, передача в ней ид карточки
  function handleCardDelete (cardId) {
      setCardIdToDelete(cardId);
      setIsDeleteSubmitPopupOpen(true);
  }

  //функция для удаления карточки при submit
  function handleCardDeleteSubmit (cardId) {
    api.deleteCard(cardId).then(()=>{
      const newCards = cards.filter(cardItem=> cardItem._id !== cardId);
      setCards(newCards);
      setCardIdToDelete(null);
      closeAllPopups()}
    )
      .catch(err => console.log(err))
  }

  //функция для добавления карточек
  function handleAddPlaceSubmit (data) {
    setLoading(true);
    api.addCard(data)
      .then(card=>{
        setCards([card, ...cards])
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(()=>setLoading(false))
  }

  return (

      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
          email={email}
          handleSignOut={handleSignOut}/>
          <main className="content">
          <Switch>
            <Route path="/sign-in">
              <Login handleLogin = {handleSignIn}/>
            </Route>

            <Route path="/sign-up">
              <Register handleRegister={handleRegister}/>
            </Route>

            <ProtectedRoute exact path="/"
                          loggedIn={loggedIn}
                          component={Main}
                          onEditAvatar  = {handleEditAvatarClick}
                          onEditProfile = {handleEditProfileClick}
                          onAddPlace    = {handleAddPlaceClick}
                          onCardClick   = {handleCardClick}
                          cards         = {cards}
                          onCardLike    = {handleCardLike}
                          onCardDelete  = {handleCardDelete}
                          email         = {email}
                          onSignOut     = {handleSignOut}
          >
            </ProtectedRoute>

            <Route>
              {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
            </Route>

          </Switch>
          </main>

          <EditProfilePopup
            isOpen       = {isEditProfilePopupOpen}
            onClose      = {closeAllPopups}
            onUpdateUser = {handleUpdateUser}
            isLoading    = {loading}/>

          <EditAvatarPopup
            isOpen         = {isEditAvatarPopupOpen}
            onClose        = {closeAllPopups}
            onUpdateAvatar = {handleUpdateAvatar}
            isLoading      = {loading}/>

          <AddPlacePopup
            isOpen     = {isAddPlacePopupOpen}
            onClose    = {closeAllPopups}
            onAddPlace = {handleAddPlaceSubmit}
            isLoading  = {loading}
          />

          <ConfirmDeletePopup
            isOpen   = {isDeleteSubmitPopupOpen}
            cardId   = {cardIdToDelete}
            onSubmit = {handleCardDeleteSubmit}
            onClose  = {closeAllPopups}/>

          <ImagePopup
            card    = {selectedCard}
            onClose = {closeAllPopups}/>

          <InfoTooltip
            isOpen = {infoTooltipIsOpened}
            onClose = {closeAllPopups}/>

          <Footer />

        </CurrentUserContext.Provider>

      </div>
  );
}

export default App;
