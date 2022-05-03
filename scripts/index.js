 // Кнопки стали работать
 const popupOpenBtn = document.querySelector(".profile__edit-button");
 const popup = document.querySelector(".popup");
 const popupCloseBtn = document.querySelector(".popup__button-close");
 const formElement = document.querySelector(".popup__form");
 const inputName = document.querySelector("#name");
 const inputAbout = document.querySelector("#about");
 // const popupSaveBtn = document.querySelector(".popup__button-save");
 let name = document.querySelector(".profile__name");
 let about = document.querySelector(".profile__description");


 popupOpenBtn.addEventListener("click", openPopup);

 function openPopup() {
     popup.classList.add("popup_active")
     inputName.value = name.textContent;
     inputAbout.value = about.textContent;
 };

 popupCloseBtn.addEventListener("click", closePopup);

 function closePopup() {
     popup.classList.remove("popup_active")
 };

 function formSubmitHandler(evt) {
     evt.preventDefault();
     name.textContent = inputName.value;
     about.textContent = inputAbout.value;
     closePopup();
 }

 formElement.addEventListener('submit', formSubmitHandler);

 //  Находим форму в DOM
 //  let formElement = // Воспользуйтесь методом querySelector() 
 //      // Находим поля формы в DOM
 //      let nameInput = // Воспользуйтесь инструментом .querySelector() 
 //          let jobInput = // Воспользуйтесь инструментом .querySelector() 


 //              // Обработчик «отправки» формы, хотя пока
 //              // она никуда отправляться не будет
 //              function formSubmitHandler(evt) {
 //                  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
 //                  // Так мы можем определить свою логику отправки.
 //                  // О том, как это делать, расскажем позже.

 //                  // Получите значение полей jobInput и nameInput из свойства value

 //                  // Выберите элементы, куда должны быть вставлены значения полей

 //                  // Вставьте новые значения с помощью textContent
 //              }

 //  // Прикрепляем обработчик к форме:
 //  // он будет следить за событием “submit” - «отправка»
 //  formElement.addEventListener('submit', formSubmitHandler);