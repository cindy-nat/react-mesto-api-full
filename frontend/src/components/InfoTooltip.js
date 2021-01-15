import React from "react";
import donePicture from "../images/done-picture.svg";
import pictureError from '../images/error-picture.svg'
import {Route} from "react-router-dom";

function InfoTooltip ({ onClose, isOpen }) {

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__form">

        <Route path="/sign-up">
          <img className="popup__picture-title"
               src={donePicture} alt="Зарегестрированы"></img>
          <h2 className="popup__title popup__title_position_center">Вы успешно зарегистрировались!</h2>
          <button type="button" className="popup__close" onClick={onClose}></button>
        </Route>

        <Route path="/sign-in">
          <img className="popup__picture-title"
               src={pictureError} alt="Ошибка"></img>
          <h2 className="popup__title popup__title_position_center">Что-то пошло не так! Попробуйте ещё раз.</h2>
          <button type="button" className="popup__close" onClick={onClose}></button>
        </Route>

      </div>
    </div>
  )
}

export default InfoTooltip;
