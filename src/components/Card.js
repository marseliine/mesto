
class Card {

    constructor({ items, handleCardClick }, templateSelector) {
        this._name = items.name;
        this._link = items.link;
        this._templateSelector = templateSelector;
        this._view = this._templateSelector.content.cloneNode(true).children[0];
        this._cardImage = this._view.querySelector(".element__picture");
        this._cardName = this._view.querySelector(".element__text");
        this._buttonLikeCard = this._view.querySelector(".element__button-like");
        this._cardDeleteButton = this._view.querySelector(".element__button-delete");
        this._handleCardClick = handleCardClick;
    };

    _likeCard() {
        this._buttonLikeCard.classList.toggle("element__button-like_type_active");
    };

    _deleteCard() {
        this._cardDeleteButton.closest(".element").remove();
    };

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link });
        });

        this._cardDeleteButton.addEventListener("click", this._deleteCard.bind(this));

        this._buttonLikeCard.addEventListener("click", this._likeCard.bind(this));
    };

    _createCard() {
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;

        this._setEventListeners();

        return this._view;
    };

    render() {
        return this._createCard();
    };

}

export default Card;

