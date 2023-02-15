let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__title');
let profileSub = document.querySelector('.profile__subtitle');

const profileEdit = document.querySelector('.profile__edit-button');
profileEdit.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSub.textContent;
    popup.classList.add('popup_opened');
});

const popupButtonClose = document.querySelector('.popup__button-close');
popupButtonClose.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
});

function handleFormSubmit (evt) {
    evt.preventDefault();
    document.getElementsByClassName('.popup__input_type_name').value;
    document.getElementsByClassName('.popup__input_type_job').value;
    profileName.textContent = nameInput.value;
    profileSub.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', handleFormSubmit);