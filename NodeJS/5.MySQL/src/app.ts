const path = require("path");
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { HasMany } from "sequelize-typescript";

const errorController = require("./controllers/error");

const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-Item");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req: Request, res: Response, next: NextFunction) => {
  User.findByPk(1)
    .then((user: String) => {
      req.user = user;
      next();
    })
    .catch((err: Error) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync({force: true})
  // .sync()
  .then((result: any) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then((user: any) => {
    if (!user) {
      return User.create({ name: "Omar", email: "test@test.com" });
    }
    return user;
  })
  .then((user: any) => {
    // console.log(user);
    app.listen(3000, () => {
      console.log("Server is Running on port 3000!");
    });
  })
  .catch((err: Error) => {
    console.log(err);
  });
