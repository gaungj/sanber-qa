const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class PenggunaPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputName () {
        return $('#nama');
    }
    get inputEmail () {
        return $('#email');
    }
    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('button[type="button"]');
    }

    get successMessage () {
        return $('.chakra-alert__desc');
    }

    get errorMessage () {
        return $('.css-qwanz3');
    }

    get btnUsers () {
        return $('a[href="/users"]'); // Select the anchor element with href="/products"
    }
    get btnCreate() {
        return $('a[href="/users/create"]'); // Select the anchor element with href="/products"
    }
    get btnSimpan () {
        return $('button.chakra-button.css-l5lnz6'); // Select the anchor element with href="/products"
    }
    
}

module.exports = new PenggunaPage();
