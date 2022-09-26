import Card from "./Сard.js";
import FormValidator from "./FormValidator.js";

// Попапы
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddImage = document.querySelector('.popup_add-card');
const popupImageZoom = document.querySelector('.popup_big_image');
const popupImage = popupImageZoom.querySelector('.popup__image');
const popupText = popupImageZoom.querySelector('.popup__text');
// Кнопки
const popupEditProfileOpenBtn = document.querySelector('.profile__edit-button');
const popupAddCardOpenBtn = document.querySelector('.profile__add-button');
//Формы
const nameInput = document.querySelector('.popup__field-name');
const jobInput = document.querySelector('.popup__field-job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const formProfileEdit = document.querySelector('form[name=profileData');
const formAddImage = document.querySelector('.form[name=add-image');
const placeInput = document.querySelector('.popup__field-place');
const linkInput = document.querySelector('.popup__field-link');

//template
const newCard = document.querySelector('.elements__table');
const cardSwitch = document.getElementById('cards').content.querySelector('.card');


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

// Валидация 
const validConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const formValidators = {};

Array.from(document.forms).forEach(formElement => {
    formValidators[formElement.name] = new FormValidator(validConfig, formElement);
    formValidators[formElement.name].enableValidation();
});

//  Заполнение формы редактирования
const fillProfileForm = () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

//  Открытие попапов
const openPopup = popup => {
    popup.classList.add('popup_active');
    document.addEventListener('keydown', handleEscape);
}



//Открывает картинки полностью
const openPopupImage = (linkImage, altImage) => {
    popupImage.src = linkImage;
    popupImage.alt = altImage;

    popupText.textContent = altImage;

    openPopup(popupImageZoom);
}



// Закрытие попапов
const closePopup = popup => {
    popup.classList.remove('popup_active');
    document.removeEventListener('keydown', handleEscape);
}

//Закрывает попап кликом где угодно
const handlePopupClose = () => {
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
handlePopupClose();


//Закрывает попапы кнопкой esc 
const handleEscape = event => {
    if (event.key === "Escape") {
        const popupOpened = document.querySelector('.popup_active');
        closePopup(popupOpened);
    }
}

//Создание карточек
const createCard = (name, link) => {
    const card = new Card(name, link, cardSwitch, openPopupImage);
    const cardElement = card.generateCard();
    return cardElement;
}

const handleCardSubmitHandler = evt => {
    evt.preventDefault();

    newCard.prepend(createCard(placeInput.value, linkInput.value, cardSwitch, openPopupImage));
    formAddImage.reset();
    closePopup(popupAddImage);
}

//Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

//Открывает попап профайла
popupEditProfileOpenBtn.addEventListener('click', () => {
    fillProfileForm();
    //formValidators[formProfileEdit.name].activateSubmitButton();
    formValidators[formProfileEdit.name].resetValidation();
    openPopup(popupEditProfile);
});

//Открывает попап добавления картинки
popupAddCardOpenBtn.addEventListener('click', () => {
    formAddImage.reset();
    //formValidators[formAddImage.name].disableSubmitButton();
    formValidators[formAddImage.name].resetValidation();
    openPopup(popupAddImage);
});



//  Меняем инфу профайла
formProfileEdit.addEventListener('submit', handleProfileFormSubmit);

//Добавление картинок
formAddImage.addEventListener('submit', handleCardSubmitHandler);


initialCards.forEach(item => {
    newCard.append(createCard(item.name, item.link, cardSwitch, openPopupImage));
});