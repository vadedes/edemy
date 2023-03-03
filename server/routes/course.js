import express from "express";

const router = express.Router();

//middleware
import { requireSignin, isInstructor } from "../middlewares";

// controllers
import { uploadImage, removeImage, create, read, addLesson } from "../controllers/course";

//image
router.post("/course/upload-image", requireSignin, uploadImage);
router.post("/course/remove-image", requireSignin, removeImage);

//course
router.post("/course", requireSignin, isInstructor, create);
router.get("/course/:slug", read);

router.post("/course/lesson/:slug/:instructorId", requireSignin, addLesson);

module.exports = router;
