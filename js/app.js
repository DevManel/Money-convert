document.addEventListener('DOMContentLoaded', () => {
    const apikey = "6d6702519cade0ebb33dac40";
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apikey}/latest/USD`;

    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const amount = document.getElementById('amount');
    const convertButton = document.getElementById('convert');
    const result = document.getElementById('result');

    async function populateCurrencyDropdowns() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const currencies = Object.keys(data.conversion_rates);

            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });

            //Devise par défaut
            fromCurrency.value = 'USD';
            toCurrency.value = 'EUR'; 
        } catch (error) {
            console.error('Erreur lors du chargement des devises:', error);
        }
    }

    //fonction pour la conversion

    async function convertCurrency() {
        const amountValue = parseFloat(amount.value);
        const fromValue = fromCurrency.value;
        const toValue = toCurrency.value;

        if(isNaN(amountValue)){
            result.textContent = 'Veuillez entrer un montant valide.';
            return;
        }

        try{
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromValue}`);
            const data = await response.json();
            const rate = data.conversion_rates[toValue];
            const convertedAmount = (amountValue * rate).toFixed(2);
            result.textContent = `${amountValue} ${fromValue} = ${convertedAmount} ${toValue}`;
        } catch (error) {
            console.error('Erreur lors de la conversion', error);
            result.textContent = 'Erreur lors de la conversion.';
        }
    }

    //initialiser l'application
    populateCurrencyDropdowns();
convertButton.addEventListener('click', convertCurrency);
})