const express = require("express");

const IdeaController = require("../controllers/ideas");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, IdeaController.createIdea);

router.put("/:id", checkAuth, extractFile, IdeaController.updateIdea);

router.get("", IdeaController.getIdeas);

router.get("/:id", IdeaController.getIdea);

router.delete("/:id", checkAuth, IdeaController.deleteIdea);

module.exports = router;
