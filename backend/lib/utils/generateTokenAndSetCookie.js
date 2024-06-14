import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (userId, res) => {
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET, {
            expiresIn: '15d'
        });

        res.cookie("token", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV !== "developement"

        })
    } catch (error) {
      console.log(
        "Error in generateTokenAndSetCookie controller",
        error.message
      );
      return res.status(500).json({ error: "Internal server error" });
    }
}