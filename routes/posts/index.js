const express = require('express');
const { storeBulkPostsFromInput } = require('./controllers/postController');
const router = express.Router();

router
    .post('/posts', storeBulkPostsFromInput);

module.exports = router;