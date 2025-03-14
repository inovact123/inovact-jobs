const express = require("express");
const companyController = require("../../controllers/company.controller");
const {
  companySanitizer,
  addCompanySanitizer,
} = require("../../controllers/company.controller/sanitizer.js");

const router = express.Router();

router.post("/", addCompanySanitizer, companyController.addCompany);

router.put("/:id", companySanitizer, companyController.upsertCompany);

router.get("/:id", companyController.getCompany);

router.delete("/", companyController.deleteCompany);

module.exports = router;
