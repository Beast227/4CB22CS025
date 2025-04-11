const express = require('express');
const { storeBulkPostsFromInput, getPopularPost } = require('./controllers/postController');
const router = express.Router();

router
    .post('/posts', storeBulkPostsFromInput)
    .get('/posts', getPopularPost);

module.exports = router;