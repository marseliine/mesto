import './index.css';
import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import Api from '../components/Api';
import {
    containerSelector,
    popupFormElement,
    editButton,
    templateSelector,
    buttonAddCard,
    formAddCard,
    validationOptions,
    profilePopupSelector,
    popupAddCardSelector,
    fullImagePopupSelector,
    popupUpdateAvatarSelector,
    formUpdateAvatar,
    buttonUpdateAvatar,
    popupConfirmSelector,
    api
} from '../utils/constants.js';
// import { concat } from 'core-js/core/array';

const configApi = new Api(api);

const userInfo = new UserInfo({
    nameSelector: '.profile__name', jobSelector: '.profile__text', avatarSelector: '.profile__image'
});

const popupEditAvatar = new PopupWithForm({
    PopupSelector: popupUpdateAvatarSelector, submitCallback: (item) => {
        popupEditAvatar.renderLoading(true);
        configApi.setUserAvatar({ avatar: item.link })
            .then((item) => {
                userInfo.setUserAvatar(item.avatar);
                popupEditAvatar.close();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                popupEditAvatar.renderLoading(false);
            })
    }
});
popupEditAvatar.setEventListeners();

const popupDeleteCard = new PopupWithConfirmation(popupConfirmSelector);
popupDeleteCard.setEventListeners();

const popupEdit = new PopupWithForm({
    PopupSelector: profilePopupSelector, submitCallback: (item) => {
        popupEdit.renderLoading(true);
        configApi.setUserInfo(item)
            .then((item) => {
                userInfo.setUserInfo(item);
                popupEdit.close();
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                popupEdit.renderLoading(false);
            })
    }
});
popupEdit.setEventListeners();

const popupAddPlace = new PopupWithForm({
    PopupSelector: popupAddCardSelector, submitCallback: (item) => {
        popupAddPlace.renderLoading(true);
        configApi.addCard(item)
            .then((item) => {
                cardsSection.addItem(createCard(item));
                console.log(item);
                popupAddPlace.close();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                popupAddPlace.renderLoading(false);
            })
    }
});
popupAddPlace.setEventListeners();

const imagePopup = new PopupWithImage(fullImagePopupSelector);
imagePopup.setEventListeners();

const createCard = (item) => {
    const card = new Card({
        items: item,
        userID: userInfo.getUserID(),
        templateSelector: templateSelector,
        handleCardClick: (item) => {
            imagePopup.open(item);
        },
        handleCardDelete: (id) => () => {
            popupDeleteCard.open();
            popupDeleteCard.setHandler(() => {
                configApi.removeCard(id)
                    .then(() => {
                        card.deleteCard();
                        popupDeleteCard.close();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
        },
        handleCardLike: () => {
            if (card.isLiked()) {
                configApi.dislikeCard(card.getCardId())
                    .then((item) => {
                        card.dislikeCard();
                        card.checkCardLikes(item.likes);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                configApi.likeCard(card.getCardId())
                    .then((item) => {
                        card.likeCard();
                        card.checkCardLikes(item.likes);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    });
    const cardElement = card.render();
    return cardElement;
};

const profileFormValidator = new FormValidator(validationOptions, popupFormElement);
const addPlaceFormValidator = new FormValidator(validationOptions, formAddCard);
const avatarFormValidator = new FormValidator(validationOptions, formUpdateAvatar);

const cardsSection = new Section({ items: [], renderer: createCard }, containerSelector);

Promise.all([configApi.getUserInfo(), configApi.getInitialCards()])
    .then(([userInformation, cards]) => {
        const { name, about, avatar, _id } = userInformation;

        userInfo.setUserInfo({ name: name, about, _id });
        userInfo.setUserAvatar(avatar);
        cardsSection.setItems(cards);
        cardsSection.render();
    })
    .catch((error) => {
        console.log(error);
    });

editButton.addEventListener("click", () => {
    popupEdit.setInputValue(userInfo.getUserInfo());
    profileFormValidator.resetValidation();
    popupEdit.open();
});

profileFormValidator.enableValidation();

buttonAddCard.addEventListener("click", () => {
    addPlaceFormValidator.resetValidation();
    popupAddPlace.open();
});

addPlaceFormValidator.enableValidation();

buttonUpdateAvatar.addEventListener("click", () => {
    avatarFormValidator.resetValidation();
    popupEditAvatar.open();
});

avatarFormValidator.enableValidation();
