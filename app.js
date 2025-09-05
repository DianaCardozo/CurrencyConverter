document.addEventListener('DOMContentLoaded', () => {
  // Tasas predeterminadas
  let rates = {
    USD: { EUR: 0.9, COP: 4000 },
    EUR: { USD: 1.1, COP: 4500 },
    COP: { USD: 0.00025, EUR: 0.00022 }
  };

  const amountInput = document.getElementById('amount');
  const fromCurrencySelect = document.getElementById('from-currency');
  const toCurrencySelect = document.getElementById('to-currency');
  const convertButton = document.getElementById('convert');
  const resultDiv = document.getElementById('result');

  const settingsButton = document.getElementById('settings-btn');
  const settingsModal = document.getElementById('settings-modal');
  const closeModalButton = document.getElementById('close-modal');
  const saveSettingsButton = document.getElementById('save-settings');

  // Lógica de conversión de divisas
  convertButton.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (amount <= 0) {
      alert("⚠️ El monto debe ser positivo.");
      return;
    }

    if (fromCurrency === toCurrency) {
      alert("⚠️ No puedes convertir la misma moneda.");
      return;
    }

    const rate = rates[fromCurrency][toCurrency];
    if (rate) {
      const result = amount * rate;
      resultDiv.innerText = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
    } else {
      alert("⚠️ No se encontró tasa para esta conversión.");
    }
  });

  // Mostrar modal de configuración
  settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'block';
  });

  // Cerrar el modal
  closeModalButton.addEventListener('click', () => {
    settingsModal.style.display = 'none';
  });

  // Guardar tasas de configuración
  saveSettingsButton.addEventListener('click', () => {
    rates.USD.COP = parseFloat(document.getElementById('usd-cop').value);
    rates.EUR.COP = parseFloat(document.getElementById('eur-cop').value);
    rates.USD.EUR = parseFloat(document.getElementById('usd-eur').value);

    alert("Tasas guardadas con éxito.");
    settingsModal.style.display = 'none';
  });
});
