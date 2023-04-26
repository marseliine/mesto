
class FormValidator {
    constructor(validationOptions, form) {
        this._options = validationOptions;
        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(this._options.inputSelector));
        this._submitButton = this._form.parentNode.querySelector(this._options.submitButtonSelector);
        this._formIsValid = this._inputs.every(inputElement => inputElement.validity.valid);
    };


    _hideError(inputElement, errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove(this._options.errorClass);
        inputElement.classList.remove(this._options.inputErrorClass);
    };

    _showError(inputElement, errorElement, validationMessage) {
        errorElement.textContent = validationMessage;
        errorElement.classList.add(this._options.errorClass);
        inputElement.classList.add(this._options.inputErrorClass);
    };

    _checkForErrors(inputElement) {
        const isValid = inputElement.validity.valid;
        const errorElement = inputElement.closest(this._options.inputSectionSelector).querySelector(this._options.inputErrorSelector);

        this._formIsValid = this._inputs.every(inputElement => inputElement.validity.valid);

        if (isValid && errorElement) {
            this._hideError(inputElement, errorElement);
        } else if (errorElement) {
            this._showError(inputElement, errorElement, inputElement.validationMessage);
        }
    };

    _enableButton() {
        this._submitButton.removeAttribute('disabled');
        this._submitButton.classList.remove(this._options.inactiveButtonClass);
    };

    _disableButton() {
        this._submitButton.setAttribute('disabled', true);
        this._submitButton.classList.add(this._options.inactiveButtonClass);
    };

    _toggleButtonState() {

        if (this._formIsValid) {
            this._enableButton();
        } else {
            this._disableButton();
        }
    };

    _setEventListeners() {
        this._inputs.forEach(inputElement => {
            inputElement.addEventListener('input', this._getInputChangeHandler(inputElement).bind(this));
        });
    };

    _getInputChangeHandler(inputElement) {
        return () => {
            this._checkForErrors(inputElement);
            this._toggleButtonState();
        }
    }

    resetValidation() {
        this._formIsValid = this._inputs.every(inputElement => inputElement.validity.valid);
        this._toggleButtonState();
        this._inputs.forEach(inputElement => {
            const errorElement = inputElement.closest(this._options.inputSectionSelector).querySelector(this._options.inputErrorSelector);
            this._hideError(inputElement, errorElement);
        });
    };

    enableValidation() {
        this._setEventListeners();
    };
};

export { FormValidator };