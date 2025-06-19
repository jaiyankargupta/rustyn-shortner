import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile,
  getAnalytic,
  isPassword,
  updateDetails,
  // updateUserProfile,
  // deleteUserProfile,
  // changeUserPassword,
  // forgotUserPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", getUserProfile);
router.get("/analytic", getAnalytic);

router.post("/changePassword", isPassword);
router.put("/updateDetails", updateDetails);
// router.put("/profile/update", updateUserProfile);
// router.delete("/profile/delete", deleteUserProfile);
// router.post("/profile/change-password", changeUserPassword);

export default router;
