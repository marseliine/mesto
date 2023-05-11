import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._buttonConfirmDeletion = this._popup.querySelector('.popup__button_confirm');

    };

    setHandler(handler) {
        this._handleDeleteCard = handler;
    };

    setEventListeners() {
        super.setEventListeners();

        this._buttonConfirmDeletion.addEventListener('click', () => {
            this._handleDeleteCard();
        })
    };
}

export default PopupWithConfirmation;