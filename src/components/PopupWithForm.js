import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor({ PopupSelector, submitCallback }) {
        super(PopupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._button = this._popup.querySelector('.popup__button');
        this._buttonText = this._button.textContent;
    };

    _getInputValue() {
        this._formValues = {};
        this._inputs.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    };

    setInputValue(item) {
        this._inputs.forEach(input => {
            input.value = item[input.name];
        });
    };

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValue());
        });
    };

    close() {
        super.close();
        this._form.reset();
    };

    renderLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this._button.textContent = loadingText;
        } else {
            this._button.textContent = this._buttonText;
        }
    };
}

export default PopupWithForm;