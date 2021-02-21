const express = require("express");
const db = require("./db/models");
const productRoutes = require("./routes/products");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/users");
const app = express();
const passport = require("passport");
const path = require("path");
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(userRoutes);
app.use(passport.initialize());
const { localStrategy } = require("./middleware/passport");
app.use(passport.initialize());
passport.use(localStrategy);//كيف يفهم ؟
app.use("/products", productRoutes);
app.use("/shop", shopRoutes);
app.use("/media"  , express.static(path.join(__dirname , "media")));



app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});

const PORT = 8000;
db.sequelize.sync({alter:true});
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
