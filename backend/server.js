const express = require("express");
const axios = require("./node_modules/axios/index.d.cts");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
app.use(cors());
app.use(bodyParser.json());

const API_KEY = process.env.MAILCHIMP_API_KEY;
const LIST_ID = process.env.MAILCHIMP_LIST_ID;
// Verifica se API_KEY existe e contém um hífen
const DC = API_KEY && API_KEY.includes("-") ? API_KEY.split("-")[1] : null;

if (!DC) {
  console.error("Formato de API_KEY inválido. Verifique seu arquivo .env");
  // Tratar o erro adequadamente
}
console.log(`API_KEY:`, API_KEY);
console.log(`LIST_ID:`, LIST_ID);

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  try {
    const response = await axios.post(
      `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        email_address: email,
        status: "subscribed",
      },
      {
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json({ message: "Subscription completed successfully!" });
  } catch (err) {
    res.status(400).json({
      message: "Error registering. Check if the email is already registered.",
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
