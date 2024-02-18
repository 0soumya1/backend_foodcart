const express = require("express");
const router = express.Router();
const app = express();

const stripe = require("stripe")(
  // Stripe secret key
  "sk_test_51OlC7dSJiyQZqSNJsDG1f2kE3UqTbSgjWKoQx12P6SuoDBRuKh92cPyUoW9ruGZ3NyFTf4g2AR2Hsp69GlHRu1Pv00S1Nuq6kT"
);

const cors = require("cors");
app.use(cors());
app.use(express.json());

// router endpoints
router.post("/payments/intents", async (req, resp) => {
  try {
    //create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,  //  integer, usd--> pennies, eur--> cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    //return the secret
    resp.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    resp.status(400).json({
        error : e.message   
    })
  }
});

module.exports = router;
