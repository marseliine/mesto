
class Card {
    constructor({ items, userID, templateSelector, handleCardClick, handleCardDelete, handleCardLike }) {
        this._name = items.name;
        this._link = items.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this._userID = userID;
        this._likes = items.likes;
        this._ownerID = items.owner._id;
        this._cardID = items._id;
        this._view = this._templateSelector.content.cloneNode(true).children[0];
        this._cardImage = this._view.querySelector(".element__picture");
        this._cardName = this._view.querySelector(".element__text");
        this._buttonLikeCard = this._view.querySelector(".element__button-like");
        this._cardDeleteButton = this._view.querySelector(".element__button-delete");
        this._likesCounter = this._view.querySelector(".element__like-count");
    };

    getCardId() {
        return this._cardID;
    }

    isLiked() {
        return this._buttonLikeCard.classList.contains("element__button-like_type_active");
    }

    _showLikes() {
        this._likes.forEach(like => {
            if (like._id === this._userID) {
                this.likeCard();
            }
        });
    };

    likeCard() {
        this._buttonLikeCard.classList.add("element__button-like_type_active");
    };

    dislikeCard() {
        this._buttonLikeCard.classList.remove("element__button-like_type_active");
    };

    deleteCard() {
        this._cardDeleteButton.closest(".element").remove();
    };

    checkCardLikes(likes) {
        this._likes = likes;
        this._likesCounter.textContent = this._likes.length;
    }

    _isOwner() {
        return this._ownerID === this._userID;
    };

    _hideDeleteButton() {
        if (!this._isOwner()) {
            this._cardDeleteButton.remove();
        }
    };

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link });
        });

        this._cardDeleteButton.addEventListener("click", this._handleCardDelete(this._cardID).bind(this));

        this._buttonLikeCard.addEventListener("click", this._handleCardLike.bind(this));
    };

    _createCard() {
        this._likesCounter.textContent = this._likes.length;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;

        this._setEventListeners();
        this._showLikes();
        this._hideDeleteButton();

        return this._view;
    };

    render() {
        return this._createCard();
    };

}

export default Card;
