const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_dyZxLZwuaOktCe",
  key_secret: "YUC0MnnXfKyR8Oc3zpFF6xvt",
});

app.post("/create-order", async (req, res) => {
  const { amount, currency, receipt, notes } = req.body;

  const options = {
    amount,
    currency,
    receipt,
    notes,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating order");
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
