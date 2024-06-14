import express from 'express'
import { protectRoute } from '../middlewares/protectRoute.js';
import { createPost, deletePost, getAllPosts, getUserPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.post("/createpost", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.get("/all", protectRoute, getAllPosts);
router.get("/profile/:username", protectRoute, getUserPosts);

export default router;
