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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//rotas da API
const contactRoutes = require("./routes/contactRoutes");

app.use("/contact", contactRoutes);


// entregar uma porta

mongoose
  .connect(
    
  )
  .then(() => {
    console.log("Conectamos ao MongoDB!");
  })
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Servidor está rodando na porta 3000");
});
