const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51PfatdBMEheqm87LBPDmsmawPnQ4kFHtz777DeXZbsLdf7AIfM6YPj5EbVWoL9zpSGvMEpjNE6OYEnwP4UnDEDqB00sZFqJMzi"
);
const uuid = require("uuid");
const app = express();

const PORT = 4000;

app.use(
  cors({
    origin: "*", // replace with your frontend URL
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/", (req, res) => {
  const { product, token } = req.body;
  //   console.log(product, token);
  const idempotencyKey = uuid.v4();
  console.log(idempotencyKey);

  return stripe.customer
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) =>
      stripe.charges.create(
        {
          amount: product.price * 100, // amount in cents
          currency: "inr",
          customer: customer.id,
          description: product.name,
          receipt_email: token.email,
        },
        { idempotencyKey }
      )
    )
    .then((charge) => res.status(200).json(charge))
    .catch((error) => console.error(error));
});
app.listen(PORT, () => {
  console.log(PORT);
});
