require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const authRouth = require("./routes/auth-route");
const profileRoute = require("./routes/profile-route");
const productRoute = require("./routes/product-route");
const favoriteRoute = require("./routes/favorite-route");
const cartRoute = require("./routes/cart-route");
const cartItemRoute = require("./routes/cart-item-route");
const orderRoute = require("./routes/order-route");
const storeRoute = require("./routes/store-route");
const categoryRoute = require("./routes/category-route")
const notFound = require("./middleware/not-found");
const error = require("./middleware/error");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRouth);
app.use("/category", categoryRoute);
app.use("/products", productRoute);
app.use("/profile", profileRoute);
app.use("/cart", cartRoute);
app.use("/cartItem", cartItemRoute);
app.use("/order", orderRoute);
app.use("/favorite", favoriteRoute);
app.use("/store", storeRoute);

app.use(notFound);
app.use(error);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
