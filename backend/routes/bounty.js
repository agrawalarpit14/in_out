const express = require("express");

const BountyController = require("../controllers/bounty");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, BountyController.createBounty);

router.get("", checkAuth, BountyController.getBounty);

router.delete("/:id", checkAuth, BountyController.deleteBounty);

module.exports = router;
