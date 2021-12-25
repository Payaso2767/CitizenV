const multer = require("multer")
module.exports = app => {
    const info = require("../controllers/population.controller");

    var router = require("express").Router();
    let upload = multer();

    router.post("/", upload.none(), info.create);

    router.get("/", info.findAll);

    router.get("/id/:id", info.findByID);

    router.get("/name/:full_name", info.findByName)

    //Delete an account by username
    router.delete("/:id", info.delete);

    //Update/Edit an account by username
    router.put("/:id", info.edit);

    // get info by commune
    router.get('/commune/:commune', info.getInfofollowCommune)
    router.get('/district/:district', info.getInfofollowDistrict)
    app.use('/api/info', router);
}