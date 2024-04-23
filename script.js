const fromCurrencyOptions = document.querySelector('.from-currency select');
const toCurrencyOptions = document.querySelector('.to-currency select');
const fromAmount = document.querySelector('.from-amount input');
const fromResult = document.getElementById('from-result');
const toResult = document.getElementById('to-result');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');

// Get country symbol from API
async function loadCountrySymbols(){
    const API_URL = 'https://api.exchangeratesapi.io/v1/symbols?access_key=9a2d15f8f804907fe57d18389e72d77a';

    const result = await fetch(API_URL);
    const data = await result.json();
    // console.log(data.symbols);
    let symbolList = data.symbols;
    showData(symbolList);
}

document.addEventListener('DOMContentLoaded', () => {
    loadCountrySymbols();
});

function showData(symbols){
    let symbolsOnly = Object.keys(symbols);
    // console.log(symbolsOnly);
    let html = "";
    symbolsOnly.forEach(symbol => {
        html += `<option data-id = "${symbol}"> ${symbol} </option>`;
    });

    fromCurrencyOptions.innerHTML = html;
    fromCurrencyOptions.querySelectorAll('option').forEach(option => {
        if(option.dataset.id == "USD") option.selected = 'selected';
    });

    toCurrencyOptions.innerHTML = html;
    toCurrencyOptions.querySelectorAll('option').forEach(option => {
        if(option.dataset.id == "GBP") option.selected = 'selected';
    });
}

// Validate the Amount to be converted
fromAmount.addEventListener('keyup', function(){
    let amount = Number(this.value);
    if(!amount) fromAmount.style.borderColor = "#de3f44";
    else fromAmount.style.borderColor = "#c6c7c9";
});

// Convert 'from country currency' 'to country currency'
convertBtn.addEventListener('click', () => {
    let fromCurrency = fromCurrencyOptions.value;
    let toCurrency = toCurrencyOptions.value;
    // console.log(fromCurrency, toCurrency);
    let fromAmt = Number(fromAmount.value);
    if(fromAmt) getConvertedData(fromCurrency, toCurrency, fromAmt);
});

// Get the converted data from the API
async function getConvertedData(from, to, amount){
    const API_URL = `https://api.exchangeratesapi.io/v1/convert?access_key=9a2d15f8f804907fe57d18389e72d77a&from=${from}&to=${to}&amount=${amount}`;
    const result = await fetch(API_URL);
    const data = await result.json();
    // console.log(data.result);
    displayConvertedData(from, to, amount, data.result);
}

// Display the converted result
function displayConvertedData(fromCurrency, toCurrency, fromAmt, toAmt){
    fromResult.innerHTML = `${fromAmt.toFixed(2)} ${fromCurrency}`;
    toResult.innerHTML = `${toAmt.toFixed(2)} ${toCurrency}`;
}

// Swap or reverse the currency
swapBtn.addEventListener('click', () => {
    let fromIndex = fromCurrencyOptions.selectedIndex;
    let toIndex = toCurrencyOptions.selectedIndex;
    fromCurrencyOptions.querySelectorAll('option')[toIndex].selected = 'selected';
    toCurrencyOptions.querySelectorAll('option')[fromIndex].selected = 'selected';
});

