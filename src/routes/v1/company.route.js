const express = require("express");
const companyController = require("../../controllers/company.controller");
const {
  companySanitizer,
} = require("../../controllers/company.controller/sanitizer.js");

const router = express.Router();

// Upsert company settings
router.put(
  "/company",
  companySettingsSanitizer,
  companyController.upsertCompany
);

// Get company settings
router.get("/company", companyController.getCompany);

// Delete company settings
router.delete("/company", companyController.deleteCompany);

module.exports = router;
