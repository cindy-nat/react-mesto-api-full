import React from "react";

function PopupWithForm({title,name, children, submitButton, isOpen, onClose, onSubmit}) {

  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <form className="popup__form" name={`popup-${name}`} onSubmit={onSubmit}>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" className="popup__submit">{submitButton}</button>
        <button type="button" className="popup__close" onClick={onClose}></button>
      </form>
    </div>
  )
}

export default PopupWithForm;
