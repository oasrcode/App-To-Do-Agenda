module.exports = app => {
    const Photo = require("../controllers/Photo.controller");
    var upload = require('../middleware/multer/upload');
    var router = require("express").Router();
    const auth = require("../middleware/auth/auth.js")
  

    router.post("/",[auth.isAuthenticated,upload.single('file')], Photo.create);
  

    router.get("/all",auth.isAuthenticated, Photo.findAll);
    
    router.get("/:id",auth.isAuthenticated,Photo.findOne);
  
    router.delete("/:id",auth.isAuthenticated, Photo.delete);
     
    router.put("/:id",auth.isAuthenticated,upload.single('file'),Photo.update)
  
    app.use('/api/photos', router);
  };