import express from "express";
import homeController from "../controllers/homeController";
let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/alo', (req, res) => {
        return res.send(`Hello Kha`)
    })
    return app.use("/", router);
}

module.exports = initWebRoutes;