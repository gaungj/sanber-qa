const { expect } = require('@wdio/globals')
const assert = require('assert');
const registerPage = require('../pageobjects/register.page')

describe('User registration', () => {
    it('should successfully register a new user with valid data', async () => {
        await registerPage.open()
        const uniqueEmail = `${Date.now()}@mailinator.com`;

        await registerPage.register('john doe', 'SuperSecretPassword!', uniqueEmail)

        await browser.waitUntil(async () => {
            return (await browser.getUrl()) === 'https://kasirdemo.vercel.app/login'; // Redirect to login page
        }, { timeout: 50000, timeoutMsg: 'Expected URL did not appear in time' });

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toBe('https://kasirdemo.vercel.app/login'); // Redirect to login page
        assert(registerPage.successMessage.isDisplayed(), 'Success message not found!');
    });

    it('should show an error message when required field is empty', async () => {
        // Negative test case
        await registerPage.open()
        await registerPage.register('john doe', 'SuperSecretPassword!')

        await expect(registerPage.errorMessage).toBeExisting();
        expect(await registerPage.errorMessage.getText()).toContain('"email" is not allowed to be empty');
    });
})

