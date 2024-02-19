import express from "express";
import path from "path";
import {
  acceptRequest,
  changePassword,
  friendRequest,
  getFriendRequest,
  getUser,
  profileViews,
  requestPasswordReset,
  resetPassword,
  suggestedFriends,
  updateUser,
  verifyEmail,
} from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

router.get("/verify/:userId/:token", verifyEmail);

// password reset
router.post("/request-passwordreset", requestPasswordReset); // request for password reset
router.get("/reset-password/:userId/:token", resetPassword); // verfiy info for reset
router.post("/reset-password", changePassword); // changes the password

// user routes
router.post("/get-user/:id?", userAuth, getUser);
router.put("/update-user", userAuth, updateUser);

// friend request
router.post("/friend-request", userAuth, friendRequest); // add request for friend
router.post("/get-friend-request", userAuth, getFriendRequest); // get all friend request

// accept/deny friend request
router.post("/accept-request", userAuth, acceptRequest);

// view profile request
router.post("/profile-view", userAuth, profileViews);

// suggested friend request
router.post("/suggested-friends", userAuth, suggestedFriends);

// email authentication

router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "index.html"));
});

router.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "index.html"));
});

export default router;
