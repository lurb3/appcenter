const authJWT = require('../middlewares/authJWT')
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/', UserController.UserSignup);
router.get('/', UserController.UserSignin);
router.get('/test', authJWT, (req, res) => res.send("HELLO"))
module.exports = router;