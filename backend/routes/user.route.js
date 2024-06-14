import express from "express";
import { getSuggestedUser, getUserProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:username",protectRoute, getUserProfile);
router.get("/suggesteduser", protectRoute ,getSuggestedUser);

export default router;