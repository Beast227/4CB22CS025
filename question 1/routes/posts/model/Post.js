const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
