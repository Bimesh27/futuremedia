import { generateTokenAndSetCookie } from "../lib/utils/generateTokenAndSetCookie.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/

        if(!username || !email || !password) {
            return res.status(400).json({message: 'Please fill all fields'});
        }
    
        const isUsernameAlreadyExists = await User.findOne({username});
        if(isUsernameAlreadyExists) {
            return res.status(400).json({error: "Username already Exists"})
        }
    
        if(!emailRegex.test(email)) {
            return res.status(400).json({error: "Invalid Email"});
        }

        const isEmailAlreadyExists = await User.findOne({email});
        if(isEmailAlreadyExists) {
            return res.status(400).json({error: "Email already exists"});
        }

        if(password.length < 6) {
            return res.status(400).json({error: "Password should be at least 6 characters"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        if(newUser){

            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

             res.status(200).json({
               message: "User registered Successfully",
               id: newUser._id,
               username: newUser.username,
               email: newUser.email,
               createdAt: newUser.createdAt,
               updatedAt: newUser.updatedAt
            });
        }
        else{
            res.status(400).json({error: "Failed to register user"});
        }
    } catch (error) {
        console.log("Error in registration controller", error.message);
        return res.status(500).json({error: "Internal server error"});
    }
    
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

        if (!email || !password) {
            return res.status(400).json({error: "Please provide email and password"});
        }

        if(!emailRegex.test(email)){
            return res.status(400).json({error: "Invalid email address"});
        }
        
        if(password.length < 6) {
            return res.status(400).json({error: "Password must be at least 6 characters"});
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }

        const isPassowordCorrect = await bcrypt.compare(password, user?.password || "");
        if(!isPassowordCorrect){
            return res.status(401).json({error: "Invalid email or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({message: "User login successfully",
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })
        
    } catch (error) {
       console.log('Error in login controller', error.message);
       return res.status(500).json({error: "Internal server error"}); 
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            maxAge:0
        })
        res.status(200).json({message: "User logout successfully"})
    } catch (error) {
        console.log('Error in logout controller', error.message);
        return res.status(500).json({error: "Error in logout controller"});
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        
        return res.status(200).json({user})

    } catch (error) {
        console.log('Error in getme controller', error.message);
        return res.status(500).json({error: "Internal server error"});
    }
}