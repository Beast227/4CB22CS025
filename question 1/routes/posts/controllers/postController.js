const Post = require("../model/Post");
const Comment = require("../../comment/model/Comment");

const getPopularPost = async (req, res) => {
    try {
        const posts = await Post.find();
        if (posts.length === 0) {
            return res.status(404).json({ message: "No post details found" });
        }

        let popularPost = null;
        let maxCommentCount = -1;

        for (const post of posts) {
            const comments = await Comment.find({ postId: post.postId });
            const currentCommentCount = comments.length;

            if (currentCommentCount > maxCommentCount) {
                maxCommentCount = currentCommentCount;
                popularPost = post;
            }
        }

        if (popularPost) {
            const commentsForPopularPost = await Comment.find({ postId: popularPost.postId });
            res.status(200).json({
                message: "Popular post fetched successfully",
                data: {
                    post: popularPost,
                    commentCount: commentsForPopularPost.length
                }
            });
        } else {
            res.status(200).json({ message: "No posts found with comments", data: null });
        }

    } catch (error) {
        console.error("Error fetching popular post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const storeBulkPostsFromInput = async (req, res) => {
    try {
        const { posts } = req.body;

        if (!Array.isArray(posts)) {
            return res.status(400).json({ message: "Request body must contain a 'posts' array." });
        }

        if (posts.length === 0) {
            return res.status(200).json({ message: "No posts to store." });
        }

        const storedPostIds = [];
        const errors = [];

        for (const postData of posts) {
            const { id, userid, content } = postData;

            if (!id || !userid || !content) {
                errors.push({ message: "Each post object must contain id, userid, and content.", data: postData });
                continue;
            }

            const newPost = new Post({
                postId: String(id), // Convert id to string as per your schema
                userId: String(userid), // Convert userid to string as per your schema
                content
            });

            try {
                await newPost.save();
                storedPostIds.push(id);
            } catch (error) {
                console.error("Error storing post:", error);
                errors.push({ message: "Error storing post.", data: postData, error: error.message });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ message: "Some posts failed to store.", errors });
        }

        res.status(201).json({ message: "Post details stored successfully.", postIds: storedPostIds });

    } catch (error) {
        console.error("Error processing post details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getPopularPost,
    storeBulkPostsFromInput
};