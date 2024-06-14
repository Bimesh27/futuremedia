import User from "../models/user.model.js";
import Post from "../models/post.model.js";

import {v2 as cloudinary} from "cloudinary";


export const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let {img} = req.body;

        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        if(!text && !img){
            return res.status(400).json({message: "Please provide either text or image"})
        }
        if(img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        const newPost = new Post({
            user: userId,
            text,
            img
        });

        await newPost.save();

        return res.status(201).json(newPost);
    } catch (error) {
        console.log('Error in createPost controller', error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const deletePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({error: "Post not found"});
        }

        if (post.user.toString() !== req.user._id.toString()) {
          return res.status(401).json({
            error: "Unauthorized, you re not allowed to delete other post",
          });
        }
        
        if(post.img){
            const imageId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imageId);
            }

        await Post.findByIdAndDelete(req.params.id);
            
        res.status(200).json({message: "Post deleted Successfully"});
    } catch (error) {
        console.log("Error in deletePost controller", error.message);
        return res.status(500).json({error: "Internal server error"});
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate({
          path: "user",
          select: "-password",
        });

        if(posts.length === 0){
            return res.status(200).json([]);
        }

        return res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getAllPosts controller", error.message);
        return res.status(500).json({error: "Internal server error"});
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        const posts = await Post.find({user: user._id}).sort({createdAt:-1}).populate({
            path: "user",
            select: "-password",
        });

        if(!posts || posts.length === 0){
            return res.status(200).json([]);
        }

        return res.status(200).json(posts)
    } catch (error) {
        console.log("Error in getUserPosts controller", error.message);
        return res.status(500).json({error: "Internal server error"})
    }
}