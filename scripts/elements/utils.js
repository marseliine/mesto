
const switchPopupListeners = () => {
    const popupList = document.querySelectorAll('.popup');
    popupList.forEach(popup => {
        popup.addEventListener('click', evt => {
            if(evt.target.classList.contains('popup_active')) {
                closePopup(popup);
            }
            if (evt.target.classList.contains('popup__close')) {
                closePopup(popup);
            }
        })
    })
}

const escClose = 'Escape';
const closeEscapeButton = (evt) => {
    if(evt.key === escClose) {
        const popup = document.querySelector('.popup_active');
        closePopup(popup);
    }

}


const openPopup = popupElement => {
    popupElement.classList.add('popup_active');
    document.addEventListener('keydown', closeEscapeButton);
};

const closePopup = popupElement => {
    popupElement.classList.remove('popup_active');
    document.removeEventListener('keydown', closeEscapeButton);
};
export {switchPopupListeners, openPopup, closePopup};
