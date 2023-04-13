export default class formValidator{
    constructor(validate, formElement){
        this._form = formElement;
        this._submitButton = this._form.querySelector(validate.submitButtonSelector);
        this._inactiveButtonClass = validate.inactiveButtonClass;
        this._inputList = Array.from(this._form.querySelectorAll(validate.inputSelector));
        this._inputErrorClass = validate.inputErrorClass;
        this._errorClass = validate.errorClass;
    }

    _hasInvalidInput = () => this._inputList.some(inputElement => !inputElement.validity.valid);

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._submitButton.setAttribute('disabled', true);
            this._submitButton.classList.add(this._inactiveButtonClass);
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.removeAttribute('disabled');
        }
      };

    _showInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
      };  

    _hideInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        errorElement.classList.remove(this._errorClass);
        inputElement.classList.remove(this._inputErrorClass);
      };

    _checkInput = (inputElement) => {
        if (inputElement.validity.valid) {
          this._hideInputError(inputElement);
        } else {
          this._showInputError(inputElement);
        }
      };  
    _setInputListeners(){
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInput(inputElement);
                this._toggleButtonState();
            })
        })
    }

    enableValidation (){
        this._setInputListeners();
    }

    resetValidation() {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement)
        });
        this._toggleButtonState();
    }

}