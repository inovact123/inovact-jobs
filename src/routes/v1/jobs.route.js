const express = require("express");
const jobController = require("../../controllers/job.controller");
const {
  createJobSanitizer,
  updateJobSanitizer,
  deleteJobSanitizer,
  getJobsSanitizer,
  getJobByIdSanitizer,
} = require("../../controllers/job.controller/sanitizer.js");
const {
  getJobApplicantsSanitizer,
  applyForJobSanitizer,
} = require("../../controllers/application.controller/sanitizer.js");
const {
  applyForJob,
  getJobApplicants,
} = require("../../controllers/application.controller/index.js");

const router = express.Router();

// Get a specific job by ID
router.get("/:id", getJobByIdSanitizer, jobController.getJobs);

// get all jobs
router.get("/", getJobsSanitizer, jobController.getJobById);

// Create a new job
router.post("/", createJobSanitizer, jobController.createJob);

// Update a job
router.put("/:id", updateJobSanitizer, jobController.updateJob);

// Delete a job
router.delete("/:id", deleteJobSanitizer, jobController.deleteJob);

router.get("/:jobId/applicants", getJobApplicantsSanitizer, getJobApplicants);

router.post("/:jobId/apply", applyForJobSanitizer, applyForJob);

module.exports = router;
