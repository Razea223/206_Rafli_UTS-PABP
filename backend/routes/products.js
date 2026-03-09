
const express = require("express");
const router = express.Router();
const product = require("../controllers/productController");
const auth = require("../middleware/auth");

router.get("/",auth,product.getProducts);
router.post("/",auth,product.createProduct);
router.delete("/:id",auth,product.deleteProduct);

module.exports = router;
