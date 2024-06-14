import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
    try {
        const {username} = req.params;
        
        const user = await User.findOne({username}).select("-password");
        if(!user) return res.status(404).json({error: "User not found"});

        return res.status(200).json(user);
    } catch (error) {
        console.log('Error in getUserProfile controller', error.message);
        return res.status(500).json({error: "Internal server error"});
    }
}

export const getSuggestedUser = async (req, res) => {
     try {
          const authUserId = req.user._id;

          const users = await User.find({ _id: { $ne: authUserId } });
          return res.status(200).json(users);
     } catch (error) {
          console.log('Error in getSuggestedUser controller', error.message);
          return res.status(500).json({ error: "Internal server error" });
     }
}