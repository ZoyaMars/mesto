import '../pages/index.css';

import Section from "../components/Section.js";
import {Card} from "../components/Сard";
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {Api} from "../components/Api";

import {UserInfo} from "../components/UserInfo.js";
import {PicturePopup} from "../components/PicturePopup";
import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js';
import {
    avatarFormName,
    avatarPopupSelector,
    cardsContainerSelector,
    cardSwitch,
    confirmationButtonSelector,
    confirmationPopupSelector,
    formConfiguration,
    formValidators,
    imagePopupSelector,
    newPlaceFormName,
    newPlacePopupSelector,
    popupAddCardOpenBtn,
    popupAvatarOpenBtn,
    popupConfiguration,
    popupEditProfileOpenBtn,
    profileConfiguration,
    profileFormName,
    profilePopupSelector,
    validConfig,
    viewPopupConfiguration,
} from "../utils/constanst";
import {RenderLoading} from "../components/RenderLoading";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
    headers: {
        authorization: '8d3c6a15-ceca-43f0-a891-5377cbbfaafe',
        'Content-Type': 'application/json'
    }
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([InitialCards, userData]) => {
        userId = userData._id;
        user.setUserInfo({ title: userData.name, job: userData.about });
        user.setUserAvatar({ avatar: userData.avatar });
        renderCards.renderAllInitialItems(InitialCards);
    })
    .catch((err) => {
        console.log(`Error: ${err}`);
    });

const user = new UserInfo(profileConfiguration);

const renderCard = (data) => {
    const newCard = new Card(
        data,
        cardSwitch,
        userId,
        data._id,
        data.owner._id,
        {
            handleCardClick: (name, image) => {
                viewPopup.open(name, image);
            },
            handleDeleteClick: (cardId) => {
                deletePopup.open();
                deletePopup.setCallback(() => {
                    api
                        .deleteCard(cardId)
                        .then(() => {
                            newCard.deletePlace();
                            deletePopup.close();
                        })
                        .catch((err) => {
                            console.log(`Error: ${err}`);
                        })
                });
            },
            handleLikeClick: (cardId) => {
                api
                    .setLike(cardId)
                    .then((data) => {
                        newCard.handleLikeCard(data);
                    })
                    .catch((err) => {
                        console.log(`Error: ${err}`);
                    });
            },
            handleRemoveLike: (cardId) => {
                api
                    .deleteLike(cardId)
                    .then((data) => {
                        newCard.handleLikeCard(data);
                    })
                    .catch((err) => {
                        console.log(`Error: ${err}`);
                    });
            },
        }
    );
    return newCard.generateCard();
};

const renderCards = new Section(
    {
        renderer: (data) => {
            renderCards.addItem(renderCard(data));
        },
    },
    cardsContainerSelector
);

const handleAvatarSubmit = (data) => {
    loaderAvatar.renderLoading(true);
    api.patchAvatarInfo(data)
        .then((result) => {
            user.setUserAvatar({ avatar: result.avatar });
            avatarPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => loaderAvatar.renderLoading(false));
};

const handleProfileFormSubmit = (data) => {
    loaderProfileEdit.renderLoading(true);
    api.patchUserInfo(data)
        .then((result) => {
            user.setUserInfo({ title: result.name, job: result.about });
            profilePopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => loaderProfileEdit.renderLoading(false));
};

Array.from(document.forms).forEach(formElement => {
    formValidators[formElement.name] = new FormValidator(validConfig, formElement);
    formValidators[formElement.name].enableValidation();
});

const viewPopup = new PicturePopup(imagePopupSelector, popupConfiguration, viewPopupConfiguration);
viewPopup.setEventListeners();

const handleCardSubmit = (data) => {
    loaderNewCard.renderLoading(true);
    api
        .addNewCard(data)
        .then((data) => {
            renderCards.addItem(renderCard(data));
            newCardPopup.close();
        })
        .catch((err) => {
            console.log(`Form error: ${err}`);
        })
        .finally(() => loaderNewCard.renderLoading(false));
};

const handleFormElement = (formName) => document.forms[formName]

const newCardPopup = new PopupWithForm(
    newPlacePopupSelector,
    handleFormElement(newPlaceFormName),
    popupConfiguration,
    formConfiguration,
    formValidators[newPlaceFormName].resetValidation,
    handleCardSubmit,
);
newCardPopup.setEventListeners();

const openAddCardPopup = () => {
    newCardPopup.open();
};

const profilePopup = new PopupWithForm(
    profilePopupSelector,
    handleFormElement(profileFormName),
    popupConfiguration,
    formConfiguration,
    formValidators[profileFormName].resetValidation,
    handleProfileFormSubmit,
    user.getUserInfo,
);

const loaderProfileEdit = new RenderLoading({
    popup: profilePopup,
    textLoader: "Сохранение...",
});

const loaderNewCard = new RenderLoading({
    popup: newCardPopup,
    textLoader: "Создание...",
});

profilePopup.setEventListeners();

const handleProfilePopupOpen = () => {
    profilePopup.open();
};

const handleAvatarPopupOpen = () => {
    avatarPopup.open();
}

const avatarPopup = new PopupWithForm(
    avatarPopupSelector,
    handleFormElement(avatarFormName),
    popupConfiguration,
    formConfiguration,
    formValidators[avatarFormName].resetValidation,
    handleAvatarSubmit
);

const loaderAvatar = new RenderLoading({
    popup: avatarPopup,
    textLoader: "Сохранение...",
});

const deletePopup = new PopupWithConfirmation(
    confirmationPopupSelector,
    popupConfiguration,
    confirmationButtonSelector,
    handleFormElement(newPlaceFormName),
);

//Открытие попапа редактирования профиля
popupEditProfileOpenBtn.addEventListener('click', handleProfilePopupOpen);
popupAvatarOpenBtn.addEventListener('click', handleAvatarPopupOpen);
popupAddCardOpenBtn.addEventListener('click', openAddCardPopup);
avatarPopup.setEventListeners();
deletePopup.setEventListeners();