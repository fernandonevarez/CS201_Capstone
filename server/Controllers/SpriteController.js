require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const chart = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
]);

const stripeCheckoutController = async (req, res) => {
  // let { amount, id } = req.body;
  // try {
  //   const payment = await stripe.paymentIntents.create({
  //     amount,
  //     currency: "USD",
  //     description: "3D Printing company",
  //     payment_method: id,
  //     confirm: true,
  //   });
  //   console.log("Payment", payment);
  //   res.json({
  //     message: "Payment successful",
  //     success: true,
  //   });
  // } catch (error) {
  //   console.log("Error", error);
  //   res.json({
  //     message: "Payment failed",
  //     success: false,
  //   });
  // }
  const YOUR_DOMAIN =
    "http://localhost:3000/api/v1/products/create-checkout-session";

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1KD0sxKGSc301ehTnx6iWakX",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
};

module.exports = { stripeCheckoutController };
