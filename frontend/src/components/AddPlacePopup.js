import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({isOpen, onClose, onAddPlace, isLoading}) {

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName (e) {
    setName(e.target.value);
  }

  function handleChangeLink (e) {
    setLink(e.target.value);
  }

  function handleAddPlace(e) {
  e.preventDefault();
  onAddPlace({name,link});
  setName("");
  setLink("");
  }

  return (
    <PopupWithForm
      title        = "Новое место"
      name         = "new-item"
      submitButton = {`${isLoading ? "Создание" : "Создать"}`}
      isOpen       = {isOpen}
      onClose      = {onClose}
      onSubmit     = {handleAddPlace}>
      <label className="popup__input-container">
        <input id="picture-name-input" type="text" className="popup__text popup__text_type_picture-name"
               name="picture_name" placeholder="Название" minLength="1"
               maxLength="30" onChange={handleChangeName} value={name||''} required/>
        <span id="picture-name-input-error" className="popup__error"></span>
      </label>
      <label className="popup__input-container">
        <input id="url-input" type="url" className="popup__text popup__text_type_link" name="link"
               placeholder="Ссылка на картинку" onChange={handleChangeLink} value={link||''} required/>
        <span id="url-input-error" className="popup__error"></span>
      </label>
  </PopupWithForm>);
}

export default AddPlacePopup;
