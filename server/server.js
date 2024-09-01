require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require ("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const { required } = require("./validators/auth-validator");
const services = require("./controllers/service-controller");

//lets tackle cors

const corsOption = {
    origin:"http://localhost:5173",
    methods : "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};
app.use(cors(corsOption));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);
// app.use(required);

//lets define the admin route
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

const PORT = 8000;
connectDb().then(() =>{
    app.listen(PORT, () => {
        console.log(`server is running at port: ${PORT}`);
    });
});

