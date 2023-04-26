import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__picture');
        this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
    };

    open({ name, link }) {
        // popupImage.setAttribute("alt", name);
        // popupImage.setAttribute("src", link);
        // popupName.textContent = name;
        this._popupImageCaption.textContent = name;
        this._popupImage.alt = name;
        this._popupImage.src = link;

        super.open();
    };
}

export default PopupWithImage; 