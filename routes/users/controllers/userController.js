

const getUserDetails = async (req, res) => {
    try {
        res.status(200).json({
            
        })
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getUserDetails
}