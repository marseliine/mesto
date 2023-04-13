import Card from './elements/Card.js';
import FormValidator from './elements/FormValidator.js';
import {initialCards} from './elements/initialCards.js';
import {validate, addCardConst, templateOfCard,popupPhotoConst, popupEditConst } from './elements/constants.js';
import {switchPopupListeners, openPopup, closePopup} from './elements/utils.js';


const editFormValidation = new FormValidator (validate,  popupEditConst.popupProfileForm);
editFormValidation.enableValidation();
const cardFormValidation = new FormValidator (validate, addCardConst.popupAddCardForm);
cardFormValidation.enableValidation();


const  submitButtonHandler = (evt) => {
    evt.preventDefault();
    popupEditConst.profileTitleName.textContent = popupEditConst.popupProfileInputName.value;
    popupEditConst.profileJob.textContent = popupEditConst.popupProfileInputJob.value;
    closePopup(popupEditConst.popupEditProfile); 
}

const editFunctionHandler = () => {
    popupEditConst.popupProfileInputName.value = popupEditConst.profileTitleName.textContent;
    popupEditConst.popupProfileInputJob.value = popupEditConst.profileJob.textContent;
    editFormValidation.resetValidation();
    openPopup(popupEditConst.popupEditProfile); 

}

const addingCardHandler = (name, link) => {
    popupPhotoConst.popupImage.src = link;
    popupPhotoConst.popupImage.alt = name;
    popupPhotoConst.popupText.textContent = name;
    openPopup(popupPhotoConst.popupSectionPhoto);

}


const addSubmitCard = (evt) => {
    evt.preventDefault();
    addCardHandler({
        name: addCardConst.popupPlaceTitle.value,
        link: addCardConst. popupUrlphoto.value
    });
    closePopup(addCardConst.popupAddCard);

}


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



switchPopupListeners();

popupEditConst.profileEditButton.addEventListener('click', editFunctionHandler);
popupEditConst.popupProfileForm.addEventListener('submit', submitButtonHandler)

addCardConst.profileAddButton.addEventListener('click', () => {
    addCardConst. popupAddCardForm.reset();
    cardFormValidation.resetValidation();
    openPopup(addCardConst.popupAddCard)
});
addCardConst.popupAddCardForm.addEventListener('submit', addSubmitCard);