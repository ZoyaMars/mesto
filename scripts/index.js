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
 const popupBigImageCloseBtn = popupBigImage.querySelector('.popup__button-close');

 //Постоянные из функций
 const image = popupBigImage.querySelector('.popup__image');

 const cardTemplate = document.getElementById('cards').content;
 const newCard = document.querySelector('.elements__table');

 //Добавление картинок
 const formAddImage = document.querySelector('form[name=card');
 const inputPlace = document.querySelector("#cardname");
 const inputLink = document.querySelector("#cardlink");

 //Спринт 6
 const popupList = Array.from(document.querySelectorAll('.popup'));
 const btnSaveAddImage = document.querySelector('.popup__button-save');
 const btnSaveEditProfile = document.querySelector('.popup__button-save');


 //  Открытие попапов
 const openPopup = popup => {
     popup.classList.add('popup_active');
     document.addEventListener('keydown', closePopupEsc);
 };

 // Закрытие попапов
 const closePopup = popup => {
     popup.classList.remove('popup_active');
     document.removeEventListener('keydown', closePopupEsc);

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


 //  Лайк
 const btnLike = event => {
     event.target.classList.toggle('button__like_active');
 };

 //Удаление карточки
 const removeImage = evt => {
     evt.target.closest('.card').remove();
 };

 //Открывает картинки полностью
 const openPopupBigImage = event => {
     image.src = event.target.closest('.card__image').src;
     image.alt = event.target.closest('.card__image').alt;
     popupBigImage.querySelector('.popup__text').textContent = event.target.closest('.card__image').alt;

     openPopup(popupBigImage);
 };

 // Закрывает картинки
 popupBigImageCloseBtn.addEventListener("click", () => {
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
 };

 const addCard = evt => {
     evt.preventDefault();
     addFirstСard(newCard, inputPlace.value, inputLink.value);
     closePopup(popupAddCard);
     formAddImage.reset();
 };


 //Спринт 6
 //Закрывает попап кликом где угодно
 const closePopupAnywhere = () => {
     popupList.forEach(popupElement => {
         popupElement.addEventListener('mousedown', event => {
             if (
                 event.target.classList.contains('popup') ||
                 event.target.closest('.popup__button-close')
             ) {
                 closePopup(popupElement);
             }
         });
     });
 }


 //Вызов функции закрытия попапа 
 closePopupAnywhere();

 //Закрывает попапы кнопкой esc 
 const closePopupEsc = event => {
     const popupactive = document.querySelector('.popup_active');
     if (event.key === "Escape") {
         closePopup(popupactive);
     }
 };

 //Открывает попап профайла
 popupEditProfileOpenBtn.addEventListener("click", () => {
     inputName.value = name.textContent;
     inputAbout.value = about.textContent;
     inactiveSubmitButton(btnSaveEditProfile); //функция в validation
     openPopup(popupEditProfile);
 });

 //Открывает попап добавления картинки
 popupAddCardOpenBtn.addEventListener("click", () => {
     formAddImage.reset();
     inactiveSubmitButton(btnSaveAddImage); //функция в validation
     openPopup(popupAddCard);


 });


 //  Меняем инфу профайла
 formEditProfile.addEventListener('submit', formSubmitHandler);
 //Добавляет картинку
 formAddImage.addEventListener('submit', addCard);