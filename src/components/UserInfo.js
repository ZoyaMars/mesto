export class UserInfo {
    constructor({ titleSelector, jobSelector }) {
        this._titleSelector = titleSelector;
        this._jobSelector = jobSelector;
        this._titleElement = document.querySelector(`.${this._titleSelector}`);
        this._jobElement = document.querySelector(`.${this._jobSelector}`);
    }

    setUserInfo = (data) => {
        this._titleElement.textContent = data.name || '';
        this._jobElement.textContent = data.job || '';
    }

    getUserInfo = () => {
        return { name: this._titleElement.textContent, job: this._jobElement.textContent };
    }
}