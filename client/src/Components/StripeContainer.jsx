import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51K4WwtKGSc301ehTUtY6WZlMWTC9SFEGsYy9L2oVWmMWTq8DP8KkMPpT6zRgSE3VGcbHDwcllzoh9fW8cXS1OCzr003HglE1jS";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
