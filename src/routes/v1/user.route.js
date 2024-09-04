const express = require('express');
const { protectUser } = require('../../middleware/authMiddleware');
const { signUp, login } = require("../../controller/user.controller")
const router = express.Router();

//base route /api/v1/users/
router.post('/signUp', signUp);
router.post('/login', login);

module.exports = router;