const buttonClose = document.querySelectorAll('.popup__button-close');
const popupEdit = document.querySelector('.popup-edit');
const popupNewCard = document.querySelector('.popup-new');
const popupPhotoBig = document.querySelector('.popup-photo');
const popups = document.querySelectorAll('.popup');
const cardTemplate = document.querySelector('.card-template').content;
///контейнеры
const popupProfileContainer = document.querySelector('.popup__container')
const popupCardContainer = document.querySelector('.container-new')
const popupImgContainer = document.querySelector('.popup__container-photo')

const formElementEditProfile = document.querySelector('.popup__form');
const formElementNewCard = document.querySelector('.form-new');
///ввод формы
const popupInputImage = document.querySelector('.popup__input_type_title');
const popupInputLink = document.querySelector('.popup__input_type_href');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const profileName = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const mainElement = document.querySelector('.elements');
const profileAdd = document.querySelector('.profile__add-button');
const profileEdit = document.querySelector('.profile__edit-button');
///кнопки закрытия
const popupButtonCloseNewCard = document.querySelector('.button-close-new');
const popupButtonCloseProfile = document.querySelector('.popup__button-close');
const popupImageClose = document.querySelector('.popup__button-close-photo');

const imageBig = document.querySelector('.popup__open-photo');
const titlePopup = document.querySelector('.popup__header-photo');

function openPopup (popups) {
    popups.classList.add('popup_opened');
}
function closePopup (popups) {
    popups.classList.remove('popup_opened');
}
function closePressingEsc(evt) {
    if (evt.key === 'Escape') {
        evt.target.blur();
        const popupElement = document.querySelector('.popup_opened');
        closePopup(popupElement);
    }
}
document.addEventListener('keydown', closePressingEsc);

document.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
})

buttonClose.forEach( (button) => {
    const popupButtonClosest = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popupButtonClosest));
});

profileEdit.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(popupEdit)
});
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupEdit);
    closePressingEsc(evt);
}
formElementEditProfile.addEventListener('submit', handleFormSubmit);

profileAdd.addEventListener('click', function() {
    openPopup(popupNewCard)
});
const cards = [
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

function createCard(elementName, elementLink) {
    const newCard = cardTemplate.querySelector('.element').cloneNode(true);
    const cardHeading = newCard.querySelector('.element__title');
    cardHeading.textContent = elementName;
    const cardImage = newCard.querySelector('.element__photo');
    cardImage.setAttribute('src', elementLink);
    cardImage.alt = elementName;

///////лайк карточки/////////////////////////////////////
    const  likeButtonCard = newCard.querySelector('.element__mask-button');
    likeButtonCard.addEventListener('click', handleLikeClick);

/////удаление карточки/////////////////////////////////
    const deleteButton = newCard.querySelector('.element__trash');
    deleteButton.addEventListener('click', handleDeleteButtonClick);

    function handleBigImage(evt){
        imageBig.src = evt.target.src;
        titlePopup.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
        imageBig.alt = evt.target.closest('.element').querySelector('.element__title').textContent;
        openPopup(popupPhotoBig)
    }

    cardImage.addEventListener('click', handleBigImage);

    return newCard;
}

function addCard(cards) {
    mainElement.prepend(cards);
}
cards.forEach(element => {
    addCard(createCard(element.name, element.link));
});
//////////////////функция постановки лайка на карточки////////////////////////////////
function handleLikeClick (evt) {
    const likeButton = evt.target;
    likeButton.classList.toggle('element__mask-button_active');
}
///////////функция удаление карточки////////////////
function handleDeleteButtonClick(event) {
    const button = event.target;
    const cardDelete = button.closest('.element');
    cardDelete.remove();
}

//////////////////////добавление новой карточки
function handleFormSubmitCard(evt) {
    evt.preventDefault();
    ////////////////// переменные присваивают значения
    // добавляет новую карточку в галерею
    addCard(createCard(popupInputImage.value, popupInputLink.value));
    ///// Закрытие попапа
    formElementNewCard.reset();
    closePopup(popupNewCard);
    closePressingEsc(evt);
};

formElementNewCard.addEventListener('submit', handleFormSubmitCard);
