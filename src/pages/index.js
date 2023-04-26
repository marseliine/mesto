import './index.css';
import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
    initialCards,
    containerSelector,
    popupFormElement,
    popupFormNameInput,
    popupFormJobInput,
    editButton,
    templateSelector,
    buttonAddCard,
    formAddCard,
    validationOptions,
    profilePopupSelector,
    popupAddCardSelector,
    fullImagePopupSelector
} from '../utils/constants.js';

const userInfo = new UserInfo({
    nameSelector: '.profile__name', jobSelector: '.profile__text'
});

const popupEdit = new PopupWithForm({
    PopupSelector: profilePopupSelector, submitCallback: (item) => {
        userInfo.setUserInfo(item);
        console.log(item);
        popupEdit.close();
    }
});
popupEdit.setEventListeners();

const popupAddPlace = new PopupWithForm({
    PopupSelector: popupAddCardSelector, submitCallback: (item) => {
        cardsSection.addItem(mainListCardRenderer(item));
        // cardsSection.render();
        popupAddPlace.close();
    }
});
popupAddPlace.setEventListeners();

const imagePopup = new PopupWithImage(fullImagePopupSelector);
imagePopup.setEventListeners();

const mainListCardRenderer = (item) => {
    const card = new Card({
        items: item,
        handleCardClick: (item) => {
            imagePopup.open(item);
            console.log(item);
        }
    }, templateSelector);
    // return card.render();
    const cardElement = card.render();
    return cardElement;
};



const profileFormValidator = new FormValidator(validationOptions, popupFormElement);
const addPlaceFormValidator = new FormValidator(validationOptions, formAddCard);

const cardsSection = new Section({ items: initialCards, renderer: mainListCardRenderer }, containerSelector);
cardsSection.render();

const handleEditButtonClick = () => {
    popupEdit.setInputValue(userInfo.getUserInfo());

    profileFormValidator.resetValidation();
    popupEdit.open();
}

const handleAddPlaceButtonClick = () => {
    addPlaceFormValidator.resetValidation();
    popupAddPlace.open();
};


editButton.addEventListener("click", handleEditButtonClick);

profileFormValidator.enableValidation();

buttonAddCard.addEventListener("click", handleAddPlaceButtonClick);

addPlaceFormValidator.enableValidation();
