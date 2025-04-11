const express = require('express');
const { getUserDetails, storeUserDetails } = require('./controllers/userController');
const router = express.Router();

router
    .get('/users', getUserDetails)
    .post('/users', storeUserDetails);

module.exports = router;