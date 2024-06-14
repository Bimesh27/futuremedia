import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({message: 'Unauthorized, u need to login first'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message: 'Unauthorized'});
        }

        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({error: "User not found"});
        }

        req.user = user;
        
        next();

    } catch (error) {
        console.log('Error in protected route', error.message);
        res.status(500).json({error: "Internal server error"});
    }
}