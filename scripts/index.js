 //Спринт4
 // Кнопки стали работать
 const popupOpenBtn = document.querySelector(".profile__edit-button");
 const popup = document.querySelector(".popup");
 const formElement = document.querySelector(".popup__form");
 const inputName = document.querySelector("#name");
 const inputAbout = document.querySelector("#about");
 const name = document.querySelector(".profile__name");
 const about = document.querySelector(".profile__description");
 //Спринт5
 const popupOpenBtnAdd = document.querySelector(".profile__add-button");
 //Попапы
 const popupEditProfile = document.querySelector(".popup__edit-profile");
 const popupAddCard = document.querySelector(".popup__add-card");
 //Кнопки закрытия
 const popupCloseBtnProfile = popupEditProfile.querySelector(".popup__button-close");
 const popupCloseBtnAddCard = popupAddCard.querySelector(".popup__button-close");


 //  Открытие попапов
 const openPopup = popup => {
     popup.classList.add('popup_active');
 }

 //Открывает попап профайла
 popupOpenBtn.addEventListener("click", () => {
     inputName.value = name.textContent;
     inputAbout.value = about.textContent;
     openPopup(popupEditProfile);
 });

 //Открывает попап добавления картинки
 popupOpenBtnAdd.addEventListener("click", () => {
     openPopup(popupAddCard);

 });

 // Закрытие попапов
 const closePopup = popup => {
     popup.classList.remove('popup_active');
 };

 // Закрывает попап профиля
 popupCloseBtnProfile.addEventListener("click", () => {
     closePopup(popupEditProfile);
 });

 // Закрывает попап добавления картинки
 popupCloseBtnAddCard.addEventListener("click", () => {
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
 formElement.addEventListener('submit', formSubmitHandler);

 //Лайк
 const like = document.querySelectorAll('.elements__like');
 like.forEach(function(el) {
     el.addEventListener('click', function(evt) {
         evt.target.classList.toggle('elements__like_active');
     });
 });