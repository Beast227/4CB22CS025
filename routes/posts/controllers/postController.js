const Post = require("../model/post");

const getPosts = async (req, res) => {
     
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
    getPosts,
    storeBulkPostsFromInput
};