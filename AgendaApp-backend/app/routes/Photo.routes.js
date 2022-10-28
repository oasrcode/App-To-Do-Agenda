module.exports = app => {
    const Photo = require("../controllers/Photo.controller");
    var upload = require('../middleware/multer/upload');
    var router = require("express").Router();
  

    router.post("/",upload.single('file'), Photo.create);
  

    router.get("/all", Photo.findAll);
    
    router.get("/:id",Photo.findOne);
  
    router.delete("/:id", Photo.delete);
     
    router.put("/:id",upload.single('file'),Photo.update)
  
    app.use('/api/photos', router);
  };