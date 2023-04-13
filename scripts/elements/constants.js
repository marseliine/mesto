export {validate, addCardConst, templateOfCard,popupPhotoConst, popupEditConst };
const popupEditConst = {
    profileEditButton: document.querySelector('.profile__edit-button'),
    popupProfileInputName: document.querySelector('#popup__name'),
    popupProfileInputJob: document.querySelector('#popup__job'),
    profileJob: document.querySelector('.profile__job'),
    profileTitleName: document.querySelector('.profile__title'),
    popupEditProfile: document.querySelector('.popup_edit-profile'),
    popupProfileForm: document.querySelector('#my__form'),

  }
const validate = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

  const addCardConst = {
    profileAddButton: document.querySelector('#add-button'),
    popupAddCard: document.querySelector('.popup_add-card'),
    cardsList: document.querySelector('.cards__list'),
    popupPlaceTitle: document.querySelector('#popup__place-title'),
    popupUrlphoto: document.querySelector('#popup__place-url'),
    popupAddCardForm: document.querySelector('#place-form')
  }

  const templateOfCard = {
    likeCardBtn: ('.card__button'),
    delBtn: ('.card__delete'),
    itemName: ('.card__title'),
    itemImage: ('.card__image')
  }


  const popupPhotoConst = {
    popupSectionPhoto: document.querySelector('.popup_photo'),
    popupImage: document.querySelector('.popup__image'),
    popupText: document.querySelector('.popup__text'),

  }

  