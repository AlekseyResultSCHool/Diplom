require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authenticated = require("./middlewares/authenticated");
const hasRole = require("./middlewares/hasRole");
const ROLES = require("./constants/roles");
const mapUser = require("./helpers/mapUser");
const mapReviews = require("./helpers/mapReviews");
const mapCatalog = require("./helpers/mapCatalog");
const mapGoods = require("./helpers/mapGoods");
const mapBasket = require("./helpers/mapBasket");
const mapTitle = require("./helpers/mapTitle");
const { getCatalog, getGoods, addGoods } = require("./controllers/catalog");
const {
  addReviews,
  getReviews,
  deleteReviews,
  updateReviews,
} = require("./controllers/reviews");
const {
  addBasket,
  getBasket,
  deleteBasket,
  updateBasket,
  removeBasket,
} = require("./controllers/basket");
const {
  login,
  register,
  getUsers,
  getRoles,
  deleteUser,
} = require("./controllers/user");

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static("../frontend/build"));

app.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

app.get("/reviews", async (req, res) => {
  const reviews = await getReviews();
  res.send({ data: reviews.map(mapReviews) });
});

app.get("/catalogs", async (req, res) => {
  const catalog = await getCatalog(req.query.search);
  res.send({ data: catalog.map(mapCatalog) });
});

app.get("/catalogs/:id", async (req, res) => {
  const goods = await getGoods(req.params.id);
  const title = await getGoods(req.params.id);
  res.send({ data: goods.goods.map(mapGoods), title: mapTitle(title) });
});

app.get("/basket", async (req, res) => {
  const basket = await getBasket();
  res.send({ data: basket.map(mapBasket) });
});

app.use(authenticated);

app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();
  res.send({ data: users.map(mapUser) });
});

app.get("/users/roles", hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = await getRoles();
  res.send({ data: roles });
});

app.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id);
  res.send({ error: null });
});

app.delete("/reviews/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteReviews(req.params.id);
  res.send({ error: null });
});

app.delete(
  "/basket/:id",
  hasRole([ROLES.ADMIN, ROLES.USER]),
  async (req, res) => {
    await deleteBasket(req.params.id);
    res.send({ error: null });
  }
);

app.delete("/basket", hasRole([ROLES.ADMIN, ROLES.USER]), async (req, res) => {
  await removeBasket();
  res.send({ error: null });
});

app.post("/reviews", hasRole([ROLES.ADMIN, ROLES.USER]), async (req, res) => {
  const newReviews = await addReviews({
    login: req.body.login,
    title: req.body.title,
    content: req.body.content,
    comments: req.body.comments,
  });
  res.send({ data: newReviews });
});

app.post("/basket", hasRole([ROLES.ADMIN, ROLES.USER]), async (req, res) => {
  try {
    const newBasket = await addBasket({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
    });
    res.send({ data: newBasket });
  } catch (e) {
    res.send({ error: e.message || "Такой товар уже добавлен в корзину" });
  }
});

app.post("/catalogs/:id/goods", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newGoods = await addGoods(req.params.id, {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    desc: req.body.desc,
    information: req.body.information,
    price: req.body.price,
  });
  res.send({ data: newGoods });
});

app.patch("/reviews/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newReviews = await updateReviews(req.params.id, {
    comments: req.body.comments,
  });
  res.send({ data: newReviews });
});

app.patch(
  "/basket/:id",
  hasRole([ROLES.ADMIN, ROLES.USER]),
  async (req, res) => {
    const newBasket = await updateBasket(req.params.id, {
      quantity: req.body.quantity,
    });
    res.send({ data: newBasket });
  }
);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server has been started on port ${port}...`);
  });
});
