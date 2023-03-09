let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__title');
let profileSub = document.querySelector('.profile__subtitle');

let mainElements = document.querySelector('.elements');

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
    profileName.textContent = nameInput.value;
    profileSub.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', handleFormSubmit);

let popupNew = document.querySelector('.popup-new');
let formElementNew = document.querySelector('.form-new');

const profileAdd = document.querySelector('.profile__add-button');
profileAdd.addEventListener('click', function() {
    popupNew.classList.add('popup_opened');
});
const popupButtonCloseNew = document.querySelector('.button-close-new');
popupButtonCloseNew.addEventListener('click', function() {
    popupNew.classList.remove('popup_opened');
});

const cards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'Архыз'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'Челябинская область'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'Иваново'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'Камчатка'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'Холмогорский район'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: 'Байкал'
    }
];

function createCard(elementName, elementLink) {
    const cardTemplate = document.querySelector('.card-template').content;
    const newCard = cardTemplate.querySelector('.element').cloneNode(true);
    const cardHeading = newCard.querySelector('.element__title');
    cardHeading.textContent = elementName;
    const cardImage = newCard.querySelector('.element__photo');
    cardImage.setAttribute('src', elementLink);

    const newImagesButton = newCard.querySelector('.button-submit-new');
    const newImages = () => {
        const cardContainer = newImagesButton.closest('.element');
        cardContainer.remove();
    }
    cardImage.style.cursor = 'pointer';
///////лайк карточки/////////////////////////////////////
    const  likeButtonCard = newCard.querySelector('.element__mask-button');
    likeButtonCard.addEventListener('click', handleLikeClick);

/////удаление карточки/////////////////////////////////
    const deleteButton = newCard.querySelector('.element__trash');
    deleteButton.addEventListener('click', handleDeleteButtonClick);

    function handleBigImage(evt){
        let imageBig = document.querySelector('.popup__open-photo');
        imageBig.src = evt.target.src;
        let titlePopup = document.querySelector('.popup__header-photo');
        titlePopup.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
        document.querySelector('.popup-photo').classList.add('popup_opened');
    }
    let newBigImage = newCard.querySelector('.element__photo');
    newBigImage.addEventListener('click', handleBigImage);
    let popupImageClose = document.querySelector('.popup__button-close-photo');
    popupImageClose.addEventListener('click', function(){
        document.querySelector('.popup-photo').classList.remove('popup_opened');
    })

    return newCard;
}

function addCard(cards) {
    mainElements.prepend(cards);
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
const popupInputImage = document.querySelector('.popup__input_type_title');
const popupInputLink = document.querySelector('.popup__input_type_href');

//////////////////////добавление новой карточки
function handleFormSubmitCard(evt) {
    evt.preventDefault();
    ////////////////// переменные присваивают значения

    // добавляет новую карточку в галерею
    addCard(createCard(popupInputImage.value, popupInputLink.value));

    cardHeading.textContent = newImageCard.title;
    cardImage.setAttribute('src', newImageCard.image);
    // добавляет в начало
    popupInputImage.value = '';
    popupInputLink.value = '';
    ///// Закрытие попапа
    popupButtonCloseNew();
};

formElementNew.addEventListener('submit', handleFormSubmitCard);
