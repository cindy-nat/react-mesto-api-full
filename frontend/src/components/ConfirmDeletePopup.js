import React from 'react';
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup ({cardId, onSubmit, onClose, isOpen }) {

  function handleSubmitForm (e) {
    e.preventDefault();
    onSubmit(cardId)
  }

  return (
    <PopupWithForm
      title        = "Вы уверены?"
      name         = "submit"
      submitButton = "Да"
      isOpen       = {isOpen}
      onClose      = {onClose}
      onSubmit     = {handleSubmitForm}/>
  )
}

export default ConfirmDeletePopup;
