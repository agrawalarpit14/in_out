const Bid = require("../models/bid");
const Ideas = require("../models/idea");

exports.createBid = async (req, res, next) => {
	let idea = await Ideas.findOne({ _id: req.body.ideaId })
	const bid = new Bid({
		ideaId: req.body.ideaId,
		title: req.body.title,
		creator: idea.creator,
		bidderId: req.userData.userId,
		price: req.body.price,
		approval: 0
    });
    bid
      .save()
      .then(bidDetails => {
        res.status(201).json({
          message: "Bid created successfully",
          bid: bidDetails
        });
      })
      .catch(error => {
		console.log(error)
        res.status(500).json({
          message: "Creating a bid failed!"
        });
		});
};

exports.makeBid = async (req, res, next) => {
	let fetchedBid = await Bid.findOne({ _id: req.params.id })
	fetchedBid.approval = req.body.approval
	// fetchedBid.price = req.body.or
	console.log(fetchedBid)
	Bid.updateOne({ _id: req.params.id }, fetchedBid)
		.then(result => {
			if (result.n > 0) {
				res.status(200).json({ message: "Update successful!" });
			} else {
				res.status(401).json({ message: "Not authorized!" });
			}
		})
		.catch(error => {
			res.status(500).json({
				message: "Couldn't udpate bid!"
			});
		});
};

exports.getAllBidsByCreator = (req, res, next) => {
	Bid.find({ creator: req.userData.userId })
	.then(bids => {
			res.status(200).json({ bids: bids });
	})
	.catch(err => {
			return res.status(401).json({
				message: "Unable to fetch bids."
	});
});
};

exports.getAllBidsByBidder = (req, res, next) => {
	Bid.find({ bidderId: req.userData.userId })
	.then(bids => {
			res.status(200).json({ bids: bids });
	})
	.catch(err => {
			return res.status(401).json({
				message: "Unable to fetch bids."
	});
});
};

// exports.updateBid = (req, res, next) => {
// 	const bid = new Bid({
// 		_id: req.body.id,
// 		ideaId: req.body.ideaId,
// 		creatorId: req.userData.userId,
// 		price: req.body.price,
// 		approval: 0
// 	});
// 	Bid.updateOne({ _id: req.params.id, creatorId: req.userData.userId }, bid)
// 		.then(result => {
// 			if (result.n > 0) {
// 				res.status(200).json({ message: "Update successful!" });
// 			} else {
// 				res.status(401).json({ message: "Not authorized!" });
// 			}
// 		})
// 		.catch(error => {
// 			res.status(500).json({
// 				message: "Couldn't udpate bid!"
// 			});
// 		});
// };