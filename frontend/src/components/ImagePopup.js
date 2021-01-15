function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_image ${card.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <figure className="popup__figure">
          <img className="popup__photo" alt={`${card.name}`} src={card.link}/>
          <figcaption className="popup__image-title">{card.name}</figcaption>
        </figure>
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;
