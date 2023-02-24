import express from "express";

const router = express.Router();

//middleware
import { requireSignin } from "../middlewares";

// controllers
import { makeInstructor, getAccountStatus, currentInstructor } from "../controllers/instructor";

router.post("/make-instructor", requireSignin, makeInstructor); //route to create an instructor
router.post("/get-account-status", requireSignin, getAccountStatus); //route to fetch account status with stripe callback on the frontend
router.get("/current-instructor", requireSignin, currentInstructor); //route to fetch current instructor - instructor route file on frontend

module.exports = router;
