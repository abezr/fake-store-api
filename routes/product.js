const express = require("express");
const router = express.Router();
const product = require("../controller/product");

router.get("/api/", product.getAllProducts);
router.get("/api/categories", product.getProductCategories);
router.get("/api/category/:category", product.getProductsInCategory);
router.get("/api/:id", product.getProduct);
router.post("/api/", product.addProduct);
router.put("/api/:id", product.editProduct);
router.patch("/:id", product.editProduct);
router.delete("/:id", product.deleteProduct);

module.exports = router;
