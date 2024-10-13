const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RegisterPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('#name');
    }

    get inputPassword () {
        return $('#password');
    }
    get inputEmail () {
        return $('#email');
    }

    get btnSubmit () {
        return $('button[type="submit"]');
    }

    get successMessage () {
        return $('.chakra-alert__desc');
    }

    get errorMessage () {
        return $('.chakra-alert');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async register(username, password, email = '') {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        if (email) {
            await this.inputEmail.setValue(email);
        }
        await this.btnSubmit.click();
    }
    

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('register');
    }
}

module.exports = new RegisterPage();
