import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HsMviAqWkW9qVPEJOXM5kqFxaLpGbfIjvB6pfN1MCu3fDdbriQ1RUYVkeSwoUQmYHQXTcrEiQVtHC8lPW64EjHN00Exsp9X8G";
  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token: token,
      },
    })
      .then((response) => {
        alert("Payment Successfull");
      })
      .catch((error) => {
        console.log("Payment error: " + JSON.parse(error));
        alert(
          "There was an issue with your payment, please make sure you use provided credit card."
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Crown Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
