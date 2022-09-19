export default class Card {
    constructor(name, link, cardSelector, openPopupImage) {
        this._name = name;
        this._link = link;
        this.__cardSelector = cardSelector;
        this._openPopupImage = openPopupImage;
    }

    // Создание template
    _getTemplate() {
        const cardTemplate = this.__cardSelector.cloneNode(true)
        return cardTemplate;
    }

    //Лайк
    _like() {
        this._likeButton.classList.toggle('button__like_active');
    }

    //Удаление карточки
    _removeImage() {
        this._element.closest('.card').remove();
    }

    _setEventListeners() {
        this._likeButton = this._element.querySelector('.button__like');

        this._likeButton.addEventListener('click', () => this._like()); //лайк
        this._element.querySelector('.card__button_remove').addEventListener('click', () => this._removeImage()); //Удаление картинки
        this._element.querySelector('.button__card').addEventListener('click', () => this._openPopupImage(this._link, this._name)); //открытие картинки
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');

        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;

        return this._element;
    }
}