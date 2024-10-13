const { expect } = require('@wdio/globals')
const assert = require('assert');
const productPage = require('../pageobjects/product.page')
const loginPage = require('../pageobjects/login.page')

describe('Add new product', () => {
    it('should show an error message if kategori is empty', async () => {
        await loginPage.open()
        await loginPage.login('john@doe.com', 'john')

        await browser.waitUntil(async () => {
            return (await browser.getUrl()) === 'https://kasirdemo.vercel.app/dashboard';
        }, { timeout: 50000, timeoutMsg: 'Expected URL did not appear in time' });

        await productPage.btnProducts.click(); // Click the button to navigate to the products page
        await browser.waitUntil(async () => {
            return (await browser.getUrl()) === 'https://kasirdemo.vercel.app/products'; // Redirect to login page
        }, { timeout: 50000, timeoutMsg: 'Expected URL did not appear in time' });

        await productPage.btnCreate.click(); // Click the button to navigate to the create product page
        await browser.waitUntil(async () => {
            return (await browser.getUrl()) === 'https://kasirdemo.vercel.app/products/create'; // Redirect to login page
        }, { timeout: 50000, timeoutMsg: 'Expected URL did not appear in time' });
        
        const name = `automation-${Date.now()}`; // Replace with the desired product name
        const cost = '14.99'; // Replace with the desired product price
        const deskripsi = 'This is a description of the new product.'; // Replace with the desired description
        const price = '24.99'; // Replace with the desired description
        const stok = '100';

        // await productPage.inputKode.setValue(kode);
        await productPage.inputName.setValue(name);
        await productPage.inputHargaBeli.setValue(cost);
        await productPage.inputHargaJual.setValue(price);
        await productPage.inputDeskripsi.setValue(deskripsi);
        await productPage.inputStok.setValue(stok);
        await productPage.btnSimpan.click(); // Click the button

        // Optional: Wait for success message or check for redirection
        await expect(productPage.errorMessage).toBeExisting(); // Assert that success message is displayed
        const error = await productPage.errorMessage.getText();
        expect(error).toContain('"category_id" is required'); // Adjust as per the actual message

    });

    it('should add a new product successfully with valid data', async () => {
        await productPage.btnProducts.click(); // Click the button to navigate to the create product page
        await browser.waitUntil(async () => {
            return (await browser.getUrl()) === 'https://kasirdemo.vercel.app/products'; // Redirect to login page
        }, { timeout: 50000, timeoutMsg: 'Expected URL did not appear in time' });

        await productPage.btnCreate.click(); // Click the button to navigate to the create product page
        await browser.waitUntil(async () => {
            return (await browser.getUrl()) === 'https://kasirdemo.vercel.app/products/create'; // Redirect to login page
        }, { timeout: 50000, timeoutMsg: 'Expected URL did not appear in time' });
        
        const name = `automation-${Date.now()}`; // Replace with the desired product name
        const cost = '14.99'; // Replace with the desired product price
        const deskripsi = 'This is a description of the new product.'; // Replace with the desired description
        const price = '24.99'; // Replace with the desired description
        const stok = '100';

        // await productPage.inputKode.setValue(kode);
        await productPage.inputName.setValue(name);
        await productPage.inputHargaBeli.setValue(cost);
        await productPage.inputHargaJual.setValue(price);
        await productPage.inputDeskripsi.setValue(deskripsi);
        await productPage.inputStok.setValue(stok);
        await productPage.inputKategori.click()
        await productPage.kategoriSelection.click()
        await productPage.btnSimpan.click(); // Click the button

        // Optional: Wait for success message or check for redirection
        await expect(productPage.successMessage).toBeExisting(); // Assert that success message is displayed
        const success = await productPage.successMessage.getText();
        expect(success).toContain('item ditambahkan'); // Adjust as per the actual message
    })
})

