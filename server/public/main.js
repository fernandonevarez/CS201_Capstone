// const { response } = require("express");

const purchase = [
  {
    id: "1",
    name: "chair",
    price: 1999,
    qty: 1
  },
  {
    id: "2",
    name: "sock",
    price: 499,
    qty: 2
  },
];

const totalAmount = 11997;
const shippingFee = 2000;

const stripe = Stripe('pk_test_51K4WwtKGSc301ehTUtY6WZlMWTC9SFEGsYy9L2oVWmMWTq8DP8KkMPpT6zRgSE3VGcbHDwcllzoh9fW8cXS1OCzr003HglE1jS');


document.querySelector("button").disabled = true;

fetch('/stripe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ purchase, totalAmount, shippingFee }),
}).then((response) => {
  return response.json()
}).then((data) => {
  const elements = stripe.elements()

  const style = {
    base: {
      color: "#32325d",
      fontFamily: "Ariel, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d"
      }
    },
    invalid: {
      fontFamily: "Ariel, snas-serif",
      color: "#fa735a",
      iconColor: "#fa735a"
    },
  }

  const card = elements.create("card", { style })

  card.mount("#card-element")
  card.on("change", (e) => {
    document.querySelector("button").disabled = e.empty;
    document.querySelector("#card-error").textContent = e.error ? e.error.message : ""
  });

  const form = document.querySelector("#payment-form")
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    payWithCard(stripe, card, data.clientSecret)
  })
}).catch((error) => console.log(error));

const loading = (isLoading) => {
  if (isLoading) {
    document.querySelector("button").disabled = true
    document.querySelector("#spinner").classList.remove("hidden")
    document.querySelector("#button-text").classList.add('hidden')
  } else {
    document.querySelector("button").disabled = false
    document.querySelector("#spinner").classList.add("hidden")
    document.querySelector("#button-text").classList.remove('hidden')
  }
}

const showError = (errorMessageText) => {
  loading(false)
  const errorMessage = document.querySelector("card-error")
  errorMessage.textContent = errorMessageText;
  setTimeout(() => {
    errorMessage.textContent = ""
  }, 4000);
}

const payWithCard = (stripe, card, clientSecret) => {
  loading(true)
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: { card }
    })
    .then(response => {
      if (response.error) {
        showError(response.error.message)
      } else {
        orderComplete(response.paymentIntent.id)
      }
    })
    .catch((error) => console.log(error))
};

const orderComplete = (paymentIntentID) => {
  loading(false);
  document
    .querySelector(".result-message a")
    .setAttribute("href", `https://dashboard.stripe.com/test/payments/${paymentIntentID}`);

  document.querySelector(".result-message").classList.remove("hidden")
  document.querySelector("button").disabled = true;
}
