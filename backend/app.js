const { sequelize } = require("./migrations");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

// CORS
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Configuración global de rutas
app.use(require("./routes/index"));

// Handle sequelize errors Middleware
app.use((err, req, res, next) => {
    console.error("Sequelize Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

async function startServer() {
    try {
        await sequelize.authenticate();

        await sequelize.sync();

        app.listen(process.env.PORT, () => {
            console.log("Server listenning at port: ", process.env.PORT);
        });
    } catch (error) {
        console.error("Error in starting server: " + error);
    }
}

startServer();
