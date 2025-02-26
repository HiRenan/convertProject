const USD = 5.77;
const EUR = 6.06;
const GBP = 7.33;

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

amount.addEventListener("input", () => {
  amount.value = amount.value.replace(/[^0-9.,]/g, "");

  const decimalMatch = amount.value.match(/[.,]/g);
  if (decimalMatch && decimalMatch.length > 1) {
    amount.value = amount.value.replace(/[.,](?=.*[.,])/g, "");
  }
});

form.onsubmit = (event) => {
  event.preventDefault();

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
};

function convertCurrency(amount, price, symbol) {
  try {
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    let total = amount * price;

    if (isNaN(total)) {
      return alert("Por favor, digite o valor corretamente para o converter.");
    }

    total = formatCurrencyBRL(total).replace("R$", "");

    result.textContent = `${total} Reais`;

    footer.classList.add("show-result");
  } catch (error) {
    footer.classList.remove("show-result");

    console.log(error);
    alert("Não foi possível converter a moeda. Tente novamente mais tarde.");
  }

  function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }
}
