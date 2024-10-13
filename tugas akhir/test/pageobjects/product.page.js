const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputName () {
        return $('#nama');
    }
    get inputKode () {
        return $('#kode');
    }
    get inputDeskripsi () {
        return $('#deskripsi');
    }
    get inputHargaBeli () {
        return $('#harga\\ beli');
    }
    get inputHargaJual () {
        return $('#harga\\ jual');
    }
    get inputStok () {
        return $('#stok');
    }
    get inputKategori () {
        return $('#kategori');
    }
    get kategoriSelection () {
        return $('//td[text()="Umum"]');
    }

    get btnSubmit () {
        return $('button[type="button"]');
    }

    get successMessage () {
        return $('.chakra-alert__desc');
    }

    get errorMessage () {
        return $('.chakra-alert');
    }

    get btnProducts () {
        return $('a[href="/products"]'); // Select the anchor element with href="/products"
    }
    get btnCreate() {
        return $('a[href="/products/create"]'); // Select the anchor element with href="/products"
    }
    get btnSimpan () {
        return $('button.chakra-button.css-l5lnz6'); // Select the anchor element with href="/products"
    }
    
}

module.exports = new ProductPage();
