const validationConfig = {
    formAllSelector: '.popup__form',
    inputPopupSelector: '.popup__input',
    submitSelectorButton: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    errorAllTypeTemplate: '.popup__input-error_type_',
    inputButtonBorder: 'popup__input_border-color',
    errorActiveClass: 'popup__input-error_active',
};

const showInputError = (input, errorElement, validationMessage, inputButtonBorder, errorActiveClass
) => {
    errorElement.textContent = validationMessage;
    input.classList.add(inputButtonBorder);

    errorElement.classList.add(errorActiveClass);
};

const hideInputError = (input, errorElement, inputButtonBorder, errorActiveClass) => {
    errorElement.textContent = '';
    input.classList.remove(inputButtonBorder);
    errorElement.classList.remove(errorActiveClass);
};

const disableButton = (submitButton, inactiveButtonClass) => {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
};

const enableButton = (submitButton, inactiveButtonClass) => {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
};

const checkInputValidity = (input, errorAllTypeTemplate, inputButtonBorder, errorActiveClass
) => {
    const errorElement = document.querySelector(
        `${errorAllTypeTemplate}${input.name}`
    );
    if (input.validity.valid) {
        hideInputError(input, errorElement, inputButtonBorder, errorActiveClass);
    } else {
        showInputError(input, errorElement, input.validationMessage, inputButtonBorder, errorActiveClass
        );
    }
};

const hasInvalidInput = (inputLists) => {
    return inputLists.some((input) => !input.validity.valid);
};

const toggleButtonState = (submitButton, inactiveButtonClass, inputLists) => {
    if (!hasInvalidInput(inputLists)) {
        enableButton(submitButton, inactiveButtonClass);
    } else {
        disableButton(submitButton, inactiveButtonClass);
    }
};

const setEventListeners = (config, formLists, errorAllTypeTemplate, inputButtonBorder, errorActiveClass, inactiveButtonClass
) => {
    formLists.forEach((form) => {
        const inputLists = Array.from(form.querySelectorAll(config.inputPopupSelector));
        const submitButton = form.querySelector(config.submitSelectorButton);
        toggleButtonState(submitButton, inactiveButtonClass, inputLists);
        inputLists.forEach((input) => {
            input.addEventListener('input', (evt) => {
                checkInputValidity(input, errorAllTypeTemplate, inputButtonBorder, errorActiveClass
                );
                toggleButtonState(submitButton, inactiveButtonClass, inputLists);
            });
        });
    });
};

const enableValidation = (config) => {
    const formLists = Array.from(document.querySelectorAll(config.formAllSelector));
    setEventListeners(config, formLists, config.errorAllTypeTemplate, config.inputButtonBorder, config.errorActiveClass, config.inactiveButtonClass
    );
};

enableValidation(validationConfig);
