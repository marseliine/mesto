const buttonCloses = document.querySelectorAll('.popup__button-close');
import Card from "./Card.js";
import FormValidator from "./validate.js";
const addCardConst = {
    profileAddButton: document.querySelector('#add-button'),
    popupNewCard: document.querySelector('.popup-new'),
    cardsList: document.querySelector('.cards__list'),
    popupInputImage: document.querySelector('.popup__input_type_title'),
    popupInputLink: document.querySelector('.popup__input_type_href'),
    popupAddCardForm: document.querySelector('#place-form')
}
const templateOfCard = {
    likeCardBtn: ('.card__button'),
    delBtn: ('.card__delete'),
    itemName: ('.card__title'),
    itemImage: ('.card__image')
}
const popupPhotoConst = {
    popupSectionPhoto: document.querySelector('.popup-photo'),
    popupImage: document.querySelector('.popup__open-photo'),
    popupText: document.querySelector('.popup__header-photo'),

}
//**popup edit constants
const popupEditConst = {
    profileEditButton: document.querySelector('.profile__edit-button'),
    popupProfileInputName: document.querySelector('#popup-name'),
    popupProfileInputJob: document.querySelector('#popup-job'),
    profileJob: document.querySelector('.profile__title'),
    profileTitleName: document.querySelector('.profile__subtitle'),
    popupEditProfile: document.querySelector('.popup-edit'),
    popupProfileForm: document.querySelector('#form-profile'),

}

const imageBig = document.querySelector('.popup__open-photo');
const titlePopup = document.querySelector('.popup__header-photo');
const formValidators = {};

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    errorClassTemplate: '.popup__input-error_type_',
    inputErrorClass: 'popup__input_border-color',
    errorClass: 'popup__input-error_active',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
}
const switchPopupListeners = () => {
    const popupList = document.querySelectorAll('.popup');
    popupList.forEach(popup => {
        popup.addEventListener('click', evt => {
            if(evt.target.classList.contains('popup_opened')) {
                closePopup(popup);
            }
            if (evt.target.classList.contains('popup__button-close')) {
                closePopup(popup);
            }
        })
    })
}

const escClose = 'Escape';

const closeEscapeButton = (evt) => {
    if(evt.key === escClose) {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }

}

const openPopup = popupElement => {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscapeButton);
};

const closePopup = popupElement => {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscapeButton);
};
export {switchPopupListeners, openPopup, closePopup};

function handlePopupClose(evt) {
    if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__button-close")
    ) {
        closePopup(openPopup);
    }
}

const editFormValidation = new FormValidator (validationConfig,  popupEditConst.popupProfileForm);
editFormValidation.enableValidation();
const cardFormValidation = new FormValidator (validationConfig, addCardConst.popupAddCardForm);
cardFormValidation.enableValidation();

//popup edit
const  submitButtonHandler = (evt) => {
    evt.preventDefault();
    popupEditConst.profileTitleName.textContent = popupEditConst.popupProfileInputName.value;
    popupEditConst.profileJob.textContent = popupEditConst.popupProfileInputJob.value;
    closePopup(popupEditConst.popupEditProfile);
}

const editFunctionHandler = () => {
    popupEditConst.popupProfileInputName.value = popupEditConst.profileTitleName.textContent;
    popupEditConst.popupProfileInputJob.value = popupEditConst.profileJob.textContent;
    
    openPopup(popupEditConst.popupEditProfile);

}
//popup add card
const addingCardHandler = (name, link) => {
    popupPhotoConst.popupImage.src = link;
    popupPhotoConst.popupImage.alt = name;
    popupPhotoConst.popupText.textContent = name;
    openPopup(popupPhotoConst.popupSectionPhoto);

}


const addSubmitCard = (evt) => {
    evt.preventDefault();
    addCardHandler({
        name: addCardConst.popupInputImage.value,
        link: addCardConst. popupInputLink.value
    });
    closePopup(addCardConst.popupNewCard);

}


//rendering cards
const makeCard = item => {
    const card = new Card(item, addingCardHandler, templateOfCard, '#template');
    const cardElement = card.generateCard();
    return cardElement;
}
const addCardHandler = (item, ending) => {
    const cardElement = makeCard(item);
    const conditional = ending ? 'append' : 'prepend';
    addCardConst.cardsList[conditional] (cardElement);

}

const renderList = () => {
    initialCards.forEach(item => {
        addCardHandler(item, true);
    })
}
renderList();


//listeners
switchPopupListeners();

popupEditConst.profileEditButton.addEventListener('click', editFunctionHandler);
popupEditConst.popupProfileForm.addEventListener('submit', submitButtonHandler)

addCardConst.profileAddButton.addEventListener('click', () => {
    addCardConst. popupAddCardForm.reset();
    
    openPopup(addCardConst.popupNewCard)
});
addCardConst.popupAddCardForm.addEventListener('submit', addSubmitCard);
