const Comment = require("../model/Comment");

const getComments = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const storeBulkCommentsFromInput = async (req, res) => {
    try {
        const { comments } = req.body;

        if (!Array.isArray(comments)) {
            return res.status(400).json({ message: "Request body must contain a 'posts' array." });
        }

        if (comments.length === 0) {
            return res.status(200).json({ message: "No posts to store." });
        }

        const storedCommentIds = [];
        const errors = [];

        for (const commentData of comments) {
            const { id, postid, content } = commentData;

            if (!id || !postid || !content) {
                errors.push({ message: "Each post object must contain id, userid, and content.", data: postData });
                continue;
            }

            const newComment = new Comment({
                commentId: String(id),
                postId: String(postid),
                content
            });

            try {
                await newComment.save();
                storedCommentIds.push(id);
            } catch (error) {
                console.error("Error storing comment:", error);
                errors.push({ message: "Error storing comment.", data: postData, error: error.message });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ message: "Some comment failed to store.", errors });
        }

        res.status(201).json({ message: "Comment details stored successfully.", commentIds: storedCommentIds });

    } catch (error) {
        console.error("Error processing post details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    storeBulkCommentsFromInput
}