const { expect } = require('@wdio/globals')
const assert = require('assert');
const penggunaPage = require('../pageobjects/pengguna.page')
const loginPage = require('../pageobjects/login.page')

describe('Add new pelanggan', () => {
    it('should add new user successfully with valid data', async () => {
        await loginPage.open()
        await loginPage.login('john@doe.com', 'john')

        await browser.waitUntil(async () => {
            return (await browser.getUrl()) === 'https://kasirdemo.vercel.app/dashboard';
        }, { timeout: 50000, timeoutMsg: 'Expected URL did not appear in time' });

        await penggunaPage.btnUsers.click(); // Click the button to navigate to the products page
        await browser.waitUntil(async () => {
            return (await browser.getUrl()) === 'https://kasirdemo.vercel.app/users'; // Redirect to login page
        }, { timeout: 50000, timeoutMsg: 'Expected URL did not appear in time' });

        await penggunaPage.btnCreate.click(); // Click the button to navigate to the create product page
        await browser.waitUntil(async () => {
            return (await browser.getUrl()) === 'https://kasirdemo.vercel.app/users/create'; // Redirect to login page
        }, { timeout: 50000, timeoutMsg: 'Expected URL did not appear in time' });
        
        const name = 'automation'; // Replace with the desired description
        const email = `automation${Date.now()}@mailinator.com`; // Replace with the desired product name
        const password = 'admin';

        // await penggunaPage.inputKode.setValue(kode);
        await penggunaPage.inputName.setValue(name);
        await penggunaPage.inputEmail.setValue(email);
        await penggunaPage.inputPassword.setValue(password);
        await penggunaPage.btnSimpan.click(); // Click the button

        // Optional: Wait for success message or check for redirection
        await expect(penggunaPage.successMessage).toBeExisting(); // Assert that success message is displayed
        const error = await penggunaPage.successMessage.getText();
        expect(error).toContain('item ditambahkan'); // Adjust as per the actual message
    });

    it('should show an error user with the same email already exist', async () => {
        await penggunaPage.btnUsers.click(); // Click the button to navigate to the products page
        await browser.waitUntil(async () => {
            return (await browser.getUrl()) === 'https://kasirdemo.vercel.app/users'; // Redirect to login page
        }, { timeout: 50000, timeoutMsg: 'Expected URL did not appear in time' });

        await penggunaPage.btnCreate.click(); // Click the button to navigate to the create product page
        await browser.waitUntil(async () => {
            return (await browser.getUrl()) === 'https://kasirdemo.vercel.app/users/create'; // Redirect to login page
        }, { timeout: 50000, timeoutMsg: 'Expected URL did not appear in time' });
        
        const name = 'automation'; // Replace with the desired description
        const email = `admin@admin.com`; // Replace with the desired product name
        const password = 'admin';

        // await penggunaPage.inputKode.setValue(kode);
        await penggunaPage.inputName.setValue(name);
        await penggunaPage.inputEmail.setValue(email);
        await penggunaPage.inputPassword.setValue(password);
        await penggunaPage.btnSimpan.click(); // Click the button

        // Optional: Wait for success message or check for redirection
        await expect(penggunaPage.errorMessage).toBeExisting(); // Assert that success message is displayed
        const success = await penggunaPage.errorMessage.getText();
        expect(success).toContain('Email sudah digunakan'); // Adjust as per the actual message
    })
})

