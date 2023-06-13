// SUNUCUYU BU DOSYAYA KURUN

const express = require("express");

const server = express();

const userModel = require("./users/model");

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Server is running on Port:9000...");
});

server.post("/api/users", async (req, res) => {
  let { name, bio } = req.body;
  if (name && bio) {
    let insertedUser = await userModel.insert({ name, bio });
    res.status(201).json(insertedUser);
  } else if (!name || !bio) {
    res
      .status(400)
      .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
  } else {
    res
      .status(500)
      .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});

server.get("/api/users", async (req, res) => {
  let allUsers = await userModel.find();

  if (allUsers) {
    res.json(allUsers);
  } else {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  let findUsers = await userModel.findById(req.params.id);

  if (findUsers) {
    res.json(findUsers);
  } else if (!findUsers) {
    res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
  } else {
    res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  let deleteUsers = await userModel.remove(req.params.id);

  if (deleteUsers) {
    res.json(deleteUsers);
  } else if (!deleteUsers) {
    res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
  } else {
    res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }
});

server.put("/api/users/:id", async (req, res) => {
  let user = await userModel.findById(req.params.id);
  let { name, bio } = req.body;

  if (user) {
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
    } else if (name && bio) {
      let updateUsers = await userModel.update(req.params.id, { name, bio });
      res.status(200).json(updateUsers);
    }
  } else if (!user) {
    res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
  } else {
    res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }
});

module.exports = server; // SERVERINIZI EXPORT EDİN {}
