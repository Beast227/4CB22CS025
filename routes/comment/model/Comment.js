const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commentId: {
        type: String,
        required: true,
        unique: true
    },
    postId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
