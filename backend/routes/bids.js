const express = require("express");

const BidController = require("../controllers/bid");

const checkAuth = require("../middleware/check-auth");


const router = express.Router();

router.post("", checkAuth, BidController.createBid);

router.put("/:id", checkAuth, BidController.makeBid);

router.get("/getAllBidsByCreatorId", checkAuth, BidController.getAllBidsByCreator);

router.get("/getAllBidsByBidderId", checkAuth, BidController.getAllBidsByBidder);

module.exports = router;
