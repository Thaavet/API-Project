const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi, errors, Segments } = require("celebrate");

const router = express.Router();


const {
	getAllProducts,
	getOneProduct,
	postOneProduct,
	putOneProduct,
	deleteOneProduct
} = require("../controllers/productController");

router.get("/", getAllProducts);

router.get("/:prodid", getOneProduct);

router.post(
	"/",
	celebrate({
		[Segments.BODY]: Joi.object({
			name: Joi.string().required()
		})
	}),
	postOneProduct

);

router.put(
	"/:prodid",
	celebrate({
		[Segments.BODY]: Joi.object({
			name: Joi.string()
		})
	}),
	putOneProduct
);


router.delete("/:prodid", deleteOneProduct);

module.exports = router;
