import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar, isLoading}) {

  const avatarInput = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarInput.current.value);
    avatarInput.current.value = "";
  }

  return (
    <PopupWithForm
      title        = "Обновить аватар"
      name         = "avatar"
      submitButton = {`${isLoading ? "Сохранение" : "Сохранить"}`}
      isOpen       = {isOpen}
      onClose      = {onClose}
      onSubmit     = {handleSubmit}>
        <label className="popup__input-container">
          <input id="avatar-url-input" type="url" className="popup__text popup__text_type_avatar"
                 name="avatar" placeholder="Ссылка на новый аватар" required ref={avatarInput}/>
          <span id="avatar-url-input-error" className="popup__error"></span>
        </label>
  </PopupWithForm>);
}

export default EditAvatarPopup;
