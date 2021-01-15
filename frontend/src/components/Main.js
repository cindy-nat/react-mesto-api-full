import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditProfile,onAddPlace,onEditAvatar, onCardClick, cards, onCardDelete, onCardLike, email, onSignOut}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
     <section className="profile page__profile">
       <div className="profile__person">
         <div className="profile__avatar" onClick={onEditAvatar} style={{backgroundImage: `url(${currentUser.avatar})`}}></div>
         <div className="profile__info">
           <h1 className="profile__name">{currentUser.name}</h1>
           <button type="button" className="profile__button-edit" onClick={onEditProfile}></button>
           <p className="profile__description">{currentUser.about}</p>
         </div>
       </div>
       <button type="button" className="profile__button-add" onClick={onAddPlace}></button>
     </section>
      <section className="cards">
        {
         cards.map((card)=> (<Card
           key          = {card._id}
           onCardClick  = {onCardClick}
           onCardLike   = {onCardLike}
           onCardDelete = {onCardDelete}
           card         = {card}/>
           )
         )
        }</section>
      </>);
}
export default Main;
