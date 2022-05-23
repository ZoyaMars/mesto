 //Спринт4
 // Кнопки стали работать
 const popupEditProfileOpenBtn = document.querySelector(".profile__edit-button");
 const formEditProfile = document.querySelector("form[name=profileData");
 const inputName = document.querySelector("#name");
 const inputAbout = document.querySelector("#about");
 const name = document.querySelector(".profile__name");
 const about = document.querySelector(".profile__description");
 //Спринт5
 const popupAddCardOpenBtn = document.querySelector(".profile__add-button");
 //Попапы
 const popupEditProfile = document.querySelector(".popup_edit-profile");
 const popupAddCard = document.querySelector(".popup_add-card");
 const popupBigImage = document.querySelector('.popup_big_image');

 //Кнопки закрытия
 const popupEditProfileCloseBtn = popupEditProfile.querySelector(".popup__button-close");
 const popupAddCardCloseBtn = popupAddCard.querySelector(".popup__button-close");
 const popupCpopupBigImageCloseBtn = popupBigImage.querySelector('.popup__button-close');

 //Постоянные из функций
 const image = popupBigImage.querySelector('.popup__image');

 const cardTemplate = document.getElementById('cards').content;
 const newCard = document.querySelector('.elements__table');

 //Добавление картинок
 const formAddImage = document.querySelector('form[name=card');
 const InputPlace = document.querySelector("#cardname");
 const InputLink = document.querySelector("#cardlink");

 //  Открытие попапов
 const openPopup = popup => {
     popup.classList.add('popup_active');
 }

 //Открывает попап профайла
 popupEditProfileOpenBtn.addEventListener("click", () => {
     inputName.value = name.textContent;
     inputAbout.value = about.textContent;
     openPopup(popupEditProfile);
 });

 //Открывает попап добавления картинки
 popupAddCardOpenBtn.addEventListener("click", () => {
     openPopup(popupAddCard);

 });

 // Закрытие попапов
 const closePopup = popup => {
     popup.classList.remove('popup_active');
 };

 // Закрывает попап профиля
 popupEditProfileCloseBtn.addEventListener("click", () => {
     closePopup(popupEditProfile);
 });

 // Закрывает попап добавления картинки
 popupAddCardCloseBtn.addEventListener("click", () => {
     closePopup(popupAddCard);
 });

 //  Заполнение попапа профайла
 function formSubmitHandler(evt) {
     evt.preventDefault();
     name.textContent = inputName.value;
     about.textContent = inputAbout.value;
     closePopup(popupEditProfile);
 };

 //  Меняем инфу профайла
 formEditProfile.addEventListener('submit', formSubmitHandler);

 //  Лайк
 const btnLike = event => {
     event.target.classList.toggle('button__like_active');
 }

 //Удаление карточки
 const removeImage = evt => {
     evt.target.closest('.card').remove();
 }

 //Открывает картинки полностью
 const openPopupBigImage = event => {
     const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

     image.src = event.target.closest('.card__image').src;
     image.alt = event.target.closest('.card__image').alt;
     popupBigImage.querySelector('.popup__text').textContent = event.target.closest('.card__image').alt;

     openPopup(popupBigImage);
 };

 // Закрывает картинки
 popupCpopupBigImageCloseBtn.addEventListener("click", () => {
     closePopup(popupBigImage);
 });

 //  Массив из первого пункта 
 const initialCards = [{
         name: "Архыз",
         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
     },
     {
         name: "Кострома",
         link: "./images/alexandra-tran-ytgQImo6ugg-unsplash.jpg"
     },
     {
         name: "Иваново",
         link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
     },
     {
         name: "Медузы",
         link: "./images/joel-filipe-_AjqGGafofE-unsplash.jpg"
     },
     {
         name: "Кит",
         link: './images/thomas-lipke-kkXDhAUnxYI-unsplash.jpg'
     },
     {
         name: "Байкал",
         link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
     }
 ];


 function createCard(item) {
     const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

     const cardImage = cardElement.querySelector('.card__image');
     const cardName = cardElement.querySelector('.card__name');

     cardImage.src = item.link;
     cardImage.alt = item.name;
     cardName.textContent = item.name;

     //Лайк в карточке
     cardElement.querySelector('.button__like').addEventListener('click', btnLike);

     //Удаляет картинки 
     cardElement.querySelector('.card__button_remove').addEventListener('click', removeImage);

     //Открывает картинки полностью
     cardElement.querySelector('.button__card').addEventListener('click', openPopupBigImage);

     return cardElement;
 };


 //Добавление карточки в контейнер
 const addCardToArray = (wrap, name, link) => {
     wrap.append(createCard({ name, link }));
 };

 //Добавляет все карточки из массива
 initialCards.forEach((item) => {
     addCardToArray(newCard, item.name, item.link);
 });


 //Добавление картинок
 const addFirstСard = (wrap, name, link) => {
     wrap.prepend(createCard({ name, link }));
 }

 const addCard = evt => {
     evt.preventDefault();
     addFirstСard(newCard, InputPlace.value, InputLink.value);
     closePopup(popupAddCard);
     formAddImage.reset();
 }

 //Добавляет картинку
 formAddImage.addEventListener('submit', addCard);