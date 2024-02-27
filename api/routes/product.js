const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");
const {getProducts,getProduct,postProduct,putProduct,deleteProduct} = require("../controllers/productController");
const router = express.Router();


router.get("/", getProducts);

router.get("/products/:name", getProduct);

router.post(
	"/",
	celebrate({
		[Segments.BODY]: Joi.object({
			name: Joi.string().required()
		})
	}),

	postProduct

);

router.put(
	"/:name",
	celebrate({
		[Segments.BODY]: Joi.object({
			name: Joi.string()
		})
	}),

	putProduct
);


router.delete("/:name", deleteProduct);

module.exports = router;
