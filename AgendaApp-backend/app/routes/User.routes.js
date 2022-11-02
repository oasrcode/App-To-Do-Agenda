module.exports = app => {
    const users = require("../controllers/User.controller.js");
    const auth = require("../middleware/auth/auth.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
  
    // Retrieve all User
    router.get("/", auth.isAuthenticated, users.findAll);
    
    // Retrieve a single User with id
    router.get("/:id", auth.isAuthenticated, users.findOne);
  
    // Update a User with id
    router.put("/:id", auth.isAuthenticated, users.update);

    // Sign in
    router.post("/signin", auth.signin);
  
    app.use('/api/users', router);
  };