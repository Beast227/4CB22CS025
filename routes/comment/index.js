const express = require('express');
const { storeBulkCommentsFromInput } = require('./controller/commentController');
const router = express.Router();

router
    .post('/comments', storeBulkCommentsFromInput);

module.exports = router;