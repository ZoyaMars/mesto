import '../pages/index.css';

import Section from "../components/Section.js";
import { Card } from "../components/Сard";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PicturePopup } from "../components/PicturePopup";
import {
    popupEditProfileOpenBtn,
    popupAddCardOpenBtn,
    cardSwitch,
    initialCards,
    validConfig,
    formValidators,
    formConfiguration,
    popupConfiguration,
    cardsContainerSelector,
    newPlacePopupSelector,
    newPlaceFormName,
    profileFormName,
    profileConfiguration,
    profilePopupSelector,
    viewPopupConfiguration,
    imagePopupSelector,
} from "../components/constanst";

Array.from(document.forms).forEach(formElement => {
    formValidators[formElement.name] = new FormValidator(validConfig, formElement);
    formValidators[formElement.name].enableValidation();
});

const viewPopup = new PicturePopup(imagePopupSelector, popupConfiguration, viewPopupConfiguration);
viewPopup.setEventListeners();

const createCard = (dataObject) => {
    const card = new Card(dataObject, cardSwitch, viewPopup.open.bind(viewPopup));
    return card.generateCard();
}


const cardsContainer = new Section({
    items: initialCards.reverse(),
    renderer: createCard,
}, cardsContainerSelector);

cardsContainer.renderAllInitialItems();

const handleCardSubmit = (item) => {
    cardsContainer.addItem(item);
};

const newCardPopup = new PopupWithForm(
    newPlacePopupSelector,
    newPlaceFormName,
    popupConfiguration,
    formConfiguration,
    formValidators[newPlaceFormName].resetValidation,
    handleCardSubmit,
);
newCardPopup.setEventListeners();

const addCardSubmitHandler = () => {
    newCardPopup.open();
};

//Отправка формы
function handleProfileFormSubmit(data) {
    user.setUserInfo(data);
};


const user = new UserInfo(profileConfiguration);

const profilePopup = new PopupWithForm(
    profilePopupSelector,
    profileFormName,
    popupConfiguration,
    formConfiguration,
    formValidators[profileFormName].resetValidation,
    handleProfileFormSubmit,
    user.getUserInfo,
);

profilePopup.setEventListeners();

const handleProfilePopupOpen = () => {
    profilePopup.open();
};

//Открытие попапа редактирования профиля
popupEditProfileOpenBtn.addEventListener('click', handleProfilePopupOpen);

popupAddCardOpenBtn.addEventListener('click', addCardSubmitHandler);