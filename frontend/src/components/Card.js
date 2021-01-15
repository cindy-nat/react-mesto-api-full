import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({onCardClick, onCardLike, onCardDelete, card}) {

  function handleClick() {
      onCardClick({name:card.name,link:card.link});
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  //получаем стейт текущего пользователя
  const currentUser = React.useContext(CurrentUserContext);

  //определяем создана карточка нами
  const isOwn = card.owner._id === currentUser._id;
  //определяем лайкнута ли карточка нами
  const isLiked = card.likes.some(like=>like._id === currentUser._id);

  //показывать кнопку удаления, если карточка создана нами
  const cardDeleteButtonDisplay = (`${isOwn ? "block" : "none"}`);
  const cardLikeButtonClassName = (`${isLiked && "cards__like_clicked"}`);

  return (
    <div className="cards__item">
        <img src={`${card.link}`} alt={card.name} className="cards__photo" onClick={handleClick}/>
        <button type="button" className="button__delete" style={{display:cardDeleteButtonDisplay}} onClick={handleDeleteClick}></button>
        <div className="cards__rectangle">
          <h2 className="cards__name">{card.name}</h2>
          <div>
            <button type="button" className={`cards__like ${cardLikeButtonClassName}`} onClick={handleLikeClick}></button>
            <p className="cards__like-number">{card.likes.length}</p>
          </div>
        </div>
      </div>
    )
}

export default Card;
