const express = require("express");
const {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
} = require("../../controllers/job.controller");
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
router.get("/:id", getJobByIdSanitizer, getJobs);

// get all jobs
router.get("/", getJobsSanitizer, getJobs);

// Create a new job
router.post("/", createJobSanitizer, createJob);

// Update a job
router.put("/:jobId", updateJobSanitizer, updateJob);

// Delete a job
router.delete("/:jobId", deleteJobSanitizer, deleteJob);

router.get("/:jobId/applicants", getJobApplicantsSanitizer, getJobApplicants);

router.post("/:jobId/apply", applyForJobSanitizer, applyForJob);

module.exports = router;
