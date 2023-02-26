import express from "express";

const router = express.Router();

//middleware
import { requireSignin } from "../middlewares";

// controllers
import { uploadImage, removeImage } from "../controllers/course";

router.post("/course/upload-image", requireSignin, uploadImage);
router.post("/course/remove-image", requireSignin, removeImage);

module.exports = router;
