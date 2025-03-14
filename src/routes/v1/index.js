const express = require("express");
const jobsRoute = require("./jobs.route");
const companyRoute = require("./company.route");
const applicationsRoute = require("./application.route");
const firebaseAuthorizer = require("../../middlewares/firebaseAuthorizer");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/job",
    route: jobsRoute,
    needAuthentication: true,
  },
  {
    path: "/company",
    route: companyRoute,
    needAuthentication: true,
  },
  {
    path: "/applications",
    route: applicationsRoute,
    needAuthentication: true,
  },
  {
    path: "/users",
    route: usersRoute,
    needAuthentication: true,
  },
];

defaultRoutes.forEach((route) => {
  if (route.needAuthentication) {
    router.use(route.path, firebaseAuthorizer, route.route);
  } else {
    router.use(route.path, route.route);
  }
});

module.exports = router;
