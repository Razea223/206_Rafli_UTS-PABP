
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);

app.listen(3000,()=>{
  console.log("Server running on port 3000");
});
