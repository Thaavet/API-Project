const Product = require("../models/Product");

async function getProducts(req, res, next) {
	try {
		const savedProducts = await Product.find({});
		res.status(200).json(savedProducts);
	} catch (error) {
		next(error);
	}
}

async function getProduct(req, res, next) {
	try {
		const prodId = await req.params.prodid;
		const label = `${String(prodId)[0].toUpperCase()}${String(prodId).slice(
			1
		)}`;

		const prodFound = await Product.findOne({ name: label });
		if (prodFound !== null) {
			res.status(200).json(prodFound);
		} else {
			res.status(404).json({
				message: `${prodId} not available`
			});
		}
	} catch (error) {
		next(error);
	}
}

async function postProduct(req, res, next) {
	try {
		const data = await req.body;
		const productExists = await Product.findOne({
			name: data["name"]
		});
		if (productExists == null) {
			const newProduct = new Product(await data);
			const savedProduct = await newProduct.save();
			res.status(200).json(newProduct);
		} else {
			res.status(200).json({
				message: `The product ${data["name"]} already exists.`
			});
		}
	} catch (error) {
		next(error);
	}
}

async function putProduct(req, res, next) {
	try {
		const data = await req.body;
		const prodId = await req.params.prodid;
		const label = `${String(prodId)[0].toUpperCase()}${String(prodId).slice(
			1
		)}`;
		const productChanged = await Product.findOneAndUpdate(
			{ name: label },
			data,
			{
				new: true
			}
		);
		res.status(200).json(productChanged);
	} catch (error) {
		next(error);
	}
}

async function deleteProduct(req, res, next) {
	try {
		const prodId = req.params.prodid;
		const label = `${String(prodId)[0].toUpperCase()}${String(prodId).slice(
			1
		)}`;
		const productRemoved = await Product.findOneAndDelete({
			name: label
		});
		res.status(200).json(productRemoved);
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getProducts,
	getProduct,
	postProduct,
	putProduct,
	deleteProduct
};
