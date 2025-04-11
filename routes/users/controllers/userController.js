const User = require('../model/User');

const getUserDetails = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: "No user details found" });
        }

        res.status(200).json({
            message: "User details fetched successfully",
            data: users
        })
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const storeUserDetails = async (req, res) => {
    try {
        const users = {
            "1": "John Doe",
            "2": "Jane Doe",
            "3": "Alice Smith",
            "4": "Bob Johnson",
            "5": "Charlie Brown",
            "6": "Diana White",
            "7": "Edward Davis",
            "8": "Fiona Miller",
            "9": "George Wilson",
            "10": "Helen Moore",
            "11": "Ivy Taylor",
            "12": "Jack Anderson",
            "13": "Kathy Thomas",
            "14": "Liam Jackson",
            "15": "Mona Harris",
            "16": "Nathan Clark",
            "17": "Olivia Lewis",
            "18": "Paul Walker",
            "19": "Quinn Scott",
            "20": "Rachel Young"
        };

        const userEntries = Object.entries(users).map(([userId, name]) => ({
            userId,
            name
        }));

        // Use insertMany with upsert-like logic to prevent duplicates
        for (const user of userEntries) {
            await User.updateOne(
                { userId: user.userId },
                { $set: user },
                { upsert: true } // inserts new if not found
            );
        }

        res.status(200).json({ message: "User details stored successfully." });
    } catch (error) {
        console.error("Error storing user details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getUserDetails,
    storeUserDetails
}