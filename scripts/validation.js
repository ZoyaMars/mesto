const validElements = {
    formSelector: 'popup__form',
    inputSelector: 'popup__field',
    submitButtonSelector: 'popup__button-save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//Показывает ошибку валидации
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

//Удаляет ошибку валидации
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
};

//Проверка валидности форм 
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    const message = inputElement.validationMessage;
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, message, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

// Для каждого поля из массива проверяем корректно ли его содержимое
const hasInvalidInput = inputList => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
};

//Кнопка не действует
const inactiveButton = () => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
}

// Настройка кнопки submit 
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

//Кнопка отправки формы стала не активной 
const inactiveSubmitButton = (buttonSave) => {
    buttonSave.disabled = true;
    buttonSave.classList.add('popup__button_disabled');
};


//Кнопка отправки формы стала активной 
const activeSubmitButton = (buttonSave) => {
    buttonSave.disabled = false;
    buttonSave.classList.remove('popup__button_disabled');
};

//Добавляем события для всех форм 
const setEventListener = (formElement, valid) => {
    const {
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass
    } = valid;
    const inputList = Array.from(formElement.querySelectorAll(`.${inputSelector}`));
    const buttonElement = formElement.querySelector(`.${submitButtonSelector}`);

    toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', (ev) => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

//Включение валидации
const enableValidation = (validElements) => {
    const { formSelector } = validElements;
    const formList = Array.from(document.querySelectorAll(`.${formSelector}`));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
        setEventListener(formElement, validElements);
    })
};

//Вызывает функцию enableValidation
enableValidation(validElements);