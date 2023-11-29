const router = require("express").Router();

const Contact = require("../models/contact");

// create - criacao de dados
router.post("/", async (req, res) => {
  //req.body
  const { name, email, telephone } = req.body;

  if (!name) {
    res.status(422).json({ error: "O nome e obrigatorio!" });
    return;
  }

  const contact = {
    name,
    email,
    telephone,
  };

  try {
    // criando dados
    await Contact.create(contact);

    res.status(201).json({ message: "Contato inserido no sistema com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Read - Leitura de dados
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  //extrair o dado da requisicao
  const id = req.params.id;

  try {
    const contact = await Contact.findOne({ _id: id });

    if (!contact) {
      res.status(422).json({ message: "O contato nao foi encontrado!" });
      return;
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Update - atualizacao de dados (PUT, PATCH)
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, email, telephone } = req.body;

  const contact = {
    name,
    email,
    telephone,
  };

  try {
    const updatedContact = await Contact.updateOne({ _id: id }, contact);

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Delete - deletar dados
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const contact = await Contact.findOne({ _id: id });

  if (!contact) {
    res.status(422).json({ message: "O contato nao foi encontrado!" });
    return;
  }

  try {
    await Contact.deleteOne({ _id: id });

    res.status(200).json({ message: "contato removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
