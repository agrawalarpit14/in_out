const Bounty = require("../models/bounty");


exports.createBounty = (req, res, next) => {
	const bounty = new Bounty({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
		creator: req.userData.userId
    });
    bounty
      .save()
      .then(bountyDetails => {
        res.status(201).json({
          message: "Bounty created successfully",
          bounty: bountyDetails
        });
      })
      .catch(error => {
		console.log(error)
        res.status(500).json({
          message: "Creating a bounty failed!"
        });
		});
};

exports.deleteBounty = (req, res, next) => {
    Bounty.deleteOne({ _id: req.params.id, creator: req.userData.userId })
      .then(result => {
        console.log(result);
        if (result.n > 0) {
          res.status(200).json({ message: "Deletion successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
          console.log(error)
        res.status(500).json({
          message: "Deleting ideas failed!"
        });
      });
};

exports.getBounty = (req, res, next) => {
	Bounty.find()
	.then(bounties => {
			res.status(200).json({ bounties: bounties });
	})
	.catch(err => {
        return res.status(401).json({
            message: "Unable to fetch bounties."
	});
});
};