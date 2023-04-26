class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    };

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener('keydown', this._handleEscape);
    };

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscape);
    };

    _handleEscape = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    };

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target === this._popup) {
                this.close();
            }
            if (evt.target.classList.contains('popup__button-close')) {
                this.close();
            }
        })
    };

}

export default Popup;