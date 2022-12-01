const express = require("express");
const app = express();

const stripe = require("stripe")('sk_test_51Az5CRIKI2OfRNxHl7em5Q38cDIl5HPW4mxNv0tAlMVfXjsBpKpqtmHP0UYohBwyD6VbZdUexYRkBTJV29bKw9v800GOmvhDbz');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  return 1500;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));