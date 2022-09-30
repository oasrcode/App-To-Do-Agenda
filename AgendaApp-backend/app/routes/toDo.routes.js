module.exports = app => {
    const ToDo = require("../controllers/ToDo.controller");
  
    var router = require("express").Router();
  

    router.post("/", ToDo.create);
  

    router.get("/all", ToDo.findAll);
    
    router.get("/:id",ToDo.findOne);
  

     router.put("/:id", ToDo.update);
  

     router.delete("/:id", ToDo.delete);
  
    app.use('/api', router);
  };