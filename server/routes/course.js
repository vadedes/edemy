import express from "express";
import formidable from "express-formidable"; //use formidable when sending file form data

const router = express.Router();

//middleware
import { requireSignin, isInstructor } from "../middlewares";

// controllers
import {
  uploadImage,
  removeImage,
  create,
  read,
  uploadVideo,
  removeVideo,
  addLesson,
} from "../controllers/course";

//image
router.post("/course/upload-image", requireSignin, uploadImage);
router.post("/course/remove-image", requireSignin, removeImage);

//course
router.post("/course", requireSignin, isInstructor, create);
router.get("/course/:slug", read);
router.post("/course/video-upload/:instructorId", requireSignin, formidable(), uploadVideo);
router.post("/course/video-remove/:instructorId", requireSignin, removeVideo);

router.post("/course/lesson/:slug/:instructorId", requireSignin, addLesson);

module.exports = router;
