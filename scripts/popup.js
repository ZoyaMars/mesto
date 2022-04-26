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

 function togglePopup() {
     popup.classList.toggle("popup_active");

 }