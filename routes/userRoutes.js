const router = require('express').Router();
const userController = require('../controllers/userController')

//Creating user registration route

router.post('/create',userController.createUser)

// controller (Export) - Routes (Import) - user = (index.js)

//Exporting
module.exports = router