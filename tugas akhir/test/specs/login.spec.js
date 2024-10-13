const { expect } = require('@wdio/globals')
const loginPage = require('../pageobjects/login.page')

describe('User login', () => {
    it('should show an error message when logging in with invalid credentials', async () => {
        // Negative test case
        await loginPage.open()
        await loginPage.login('john@doe.com', 'notjohn')

        await expect(loginPage.errorMessage).toBeExisting();
        expect(await loginPage.errorMessage.getText()).toContain('Kredensial yang Anda berikan salah');
    });

    it('should successfully login with valid credential', async () => {
        await loginPage.open()
        await loginPage.login('john@doe.com', 'john')

        await browser.waitUntil(async () => {
            return (await browser.getUrl()) === 'https://kasirdemo.vercel.app/dashboard'; // Redirect to login page
        }, { timeout: 50000, timeoutMsg: 'Expected URL did not appear in time' });

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toBe('https://kasirdemo.vercel.app/dashboard'); // Redirect to login page
    });
})

