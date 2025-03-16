const express = require("express");
const companyController = require("../../controllers/company.controller");
const {
  companySanitizer,
  addCompanySanitizer,
} = require("../../controllers/company.controller/sanitizer.js");

const router = express.Router();

router.post("/", addCompanySanitizer, companyController.addCompany);

router.put("/:id", companyController.upsertCompany);

router.get("/:id", companyController.getCompany);

router.delete("/:id", companyController.deleteCompany);

module.exports = router;
