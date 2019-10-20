const Idea = require("../models/idea");

exports.createIdea = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const idea = new Idea({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
    associated_hackathon: req.body.associated_hackathon,
    demo_link: req.body.demo_link,
    badge: req.body.badge,
    stack_materials: req.body.stack_materials.split(','),
    labels: req.body.labels.split(','),
    meta_tags: req.body.meta_tags.split(','),
    team_members: req.body.team_members.split(',')
  });
  // console.log(idea)
  idea
    .save()
    .then(createdIdea => {
      res.status(201).json({
        message: "Idea added successfully",
        idea: {
          ...createdIdea,
          id: createdIdea._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a idea failed!"
      });
    });
};

exports.updateIdea = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const idea = new Idea({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    imagePath: imagePath,
    creator: req.userData.userId,
    associated_hackathon: req.body.associated_hackathon,
    demo_link: req.body.demo_link,
    badge: req.body.badge,
    stack_materials: req.body.stack_materials.split(','),
    labels: req.body.labels.split(','),
    meta_tags: req.body.meta_tags.split(','),
    team_members: req.body.team_members.split(',')
  });
  Idea.updateOne({ _id: req.params.id, creator: req.userData.userId }, idea)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate idea!"
      });
    });
};

exports.getIdeas = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const ideaQuery = Idea.find();
  let fetchedIdeas;
  if (pageSize && currentPage) {
    ideaQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  ideaQuery
    .then(documents => {
      fetchedIdeas = documents;
      return Idea.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Ideas fetched successfully!",
        ideas: fetchedIdeas,
        maxIdeas: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching ideas failed!"
      });
    });
};

exports.getIdea = (req, res, next) => {
  Idea.findById(req.params.id)
    .then(idea => {
      if (idea) {
        res.status(200).json(idea);
      } else {
        res.status(404).json({ message: "Idea not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching idea failed!"
      });
    });
};

exports.deleteIdea = (req, res, next) => {
  Idea.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting ideas failed!"
      });
    });
};
