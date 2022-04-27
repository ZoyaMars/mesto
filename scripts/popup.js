 const popupOpenBtn = document.querySelector(".profile__edit-button");
 const popup = document.querySelector(".popup");
 const popupCloseBtn = document.querySelector(".popup__button-close");

 popupOpenBtn.addEventListener("click", function(event) {
     event.preventDefault();
     togglePopup();
 });

 popupCloseBtn.addEventListener("click", function(event) {
     togglePopup();
 });

 popup.addEventListener("click", function(event) {
     if (event.target == event.currentTarget) {
         togglePopup();

     }
 });

 function togglePopup() {
     popup.classList.toggle("popup_active");

 }

 const formElement = document.querySelector(".popup__form");
 const inputUserName = document.querySelector(".popup__field_name");
 const inputUserAbout = document.querySelector(".popup__field_about");

 function fillEditProfileInputs() {
     inputUserName.value = profileUserName.textContent;
     inputUserAbout.value = profileUserAbout.textContent;
 }

 function editFormSubmitHandler(evt) {
     evt.preventDefault();
     profileUserName.textContent = inputUserName.value;
     profileUserAbout.textContent = inputUserAbout.value;
     popupEditProfile.classList.remove("popup_active");
 }

 const popupSaveBtn = document.querySelector(".popup__button-save");

 popupSaveBtn.addEventListener('click', function() {
     togglePopup();
 });

 formElement.addEventListener('submit', formSubmitHandler);



 //  // Находим форму в DOM
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