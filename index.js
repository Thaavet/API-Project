const express = require("express"); 
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/product"); 
const orderRoutes = require("./api/routes/order"); 
const userRoutes = require("./api/routes/user");

const app = express(); const port = 3000;

mongoose.connect('mongodb+srv://admin:admin2024@nodeapi.jht4thd.mongodb.net/PlantofFoodAPI?retryWrites=true&w=majority&appName=NodeAPI') 
.then (() => { console.log("Connected to MongoDB"); })
.catch (error => { console.log(error); });



app.use(express.json());

app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", "*"); res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization" ); 
if (req.method === "OPTIONS") { res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); 
return res.status(200).json({}); } next(); });

app.get("/", (req, res) => { res.status(200).json({ message: "Hello from the Plant of Food API" }); });

app.use("/products", productRoutes);
 app.use("/orders", orderRoutes);
 app.use("/users", userRoutes);

app.use((req, res, next) => { const error = new Error("Error 404: Page Not found"); error.status = 404; next(error); 
});

app.use((error, req, res, next) => 
{ res.status(error.status || 500); res.json({ error: { message: error.message, }, 
});
 });

app.listen(port, () => { console.log(`Server started on port ${port}`);
});
