const authJWT = require('../middlewares/authJWT')
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/', UserController.UserSignup);
router.post('/login', UserController.UserSignin);
router.get('/getid', authJWT, UserController.GetUserId);
module.exports = router;