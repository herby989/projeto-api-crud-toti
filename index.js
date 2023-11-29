require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const app = express();

const swaggerUi = require('swagger-ui-express')

const swaggerDocs = require("./routes/swagger.json")

//Forma de ler JSON  /middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//Rota da documentação OPEN API Swagger

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//rotas da API
const contactRoutes = require("./routes/contactRoutes");

app.use("/contact", contactRoutes);


// entregar uma porta

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.pyfdgkp.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectamos ao MongoDB!");
  })
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Servidor está rodando na porta 3000");
});
