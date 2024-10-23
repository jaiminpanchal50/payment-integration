import StripeCheckout from "react-stripe-checkout";

import "./App.css";
import { useState } from "react";

function App() {
  const [product, setProduct] = useState({
    name: "Product 1",
    price: 10,
    productBy: "google",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    }
    const headers={
      "Content-Type":"application/json"
    }

    fetch("http://localhost:8000",{
      method: "POST",
      headers,
      body: JSON.stringify(body), 
    }).then((response)=>{
      console.log(response);
    }).catch((error)=>{
      console.error(error);
    });
  };

  return (
    <>
      <h1>React Stripe Checkout</h1>
      <p>Price: {product.price * 100} INR</p>

      <StripeCheckout
        stripeKey="pk_test_51PfatdBMEheqm87LIWMLI78S5WqX4Twmb1ovGjaunbnFIHyhPpkBBAiThdeIR4GSZ4DCP9U3GypT2NzDvmNBQBWb008DLPWk8U"
        token={makePayment}
        name={product.name}
        amount={product.price}
        currency="USD"
        description={product.priductBy}
        locale="auto"
      >
        <button>Pay {product.price * 100}</button>
      </StripeCheckout>
    </>
  );
}

export default App;
