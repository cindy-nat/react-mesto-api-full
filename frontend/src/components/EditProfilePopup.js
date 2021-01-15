import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function EditProfilePopup ({isOpen, onClose, onUpdateUser, isLoading}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(()=>{
    setName(currentUser.name);
    setDescription(currentUser.about);
  },[currentUser])

  function handleChangeName (e) {
    setName(e.target.value)
  }

  function handleChangeDescription (e) {
    setDescription(e.target.value)
  }

   function handleSubmit(e) {
      e.preventDefault();
     onUpdateUser({
       name, about: description
     })
   }

  return (
    <PopupWithForm
      title = "Редактировать профиль"
      name = "edit"
      submitButton ={`${isLoading ? "Сохранение" : "Сохранить"}`}
      isOpen = {isOpen}
      onClose = {onClose}
      onSubmit={handleSubmit}>
      <label className="popup__input-container">
        <input id="name-input" type="text" className="popup__text popup__text_type_name" name="name"
               placeholder="Имя" minLength="2" maxLength="40"
               required value={name||''} onChange={handleChangeName}/>
        <span id="name-input-error" className="popup__error"></span>
      </label>
      <label className="popup__input-container">
        <input id="description-input" type="text" className="popup__text popup__text_type_description"
               name="description" value={description||''} placeholder="Описание" minLength="2"
               maxLength="200" required onChange={handleChangeDescription}/>
        <span id="description-input-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
