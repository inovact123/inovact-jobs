const express = require("express");
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../../controllers/users.controller");
const {
  createUserSanitizer,
  updateUserSanitizer,
  deleteUserSanitizer,
  getUserSanitizer,
} = require("../../controllers/users.controller/sanitizer");

const router = express.Router();

// Create a user
router.post("/", createUserSanitizer, createUser);

// Get user by ID
router.get("/:userId", getUserSanitizer, getUser);

router.get("/", getUserSanitizer, getUser);

// Update a user
router.put("/", updateUserSanitizer, updateUser);

// Delete a user
router.delete("/", deleteUserSanitizer, deleteUser);

module.exports = router;
