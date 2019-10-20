const mongoose = require("mongoose");

const ideaSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },  
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  associated_hackathon: { type: String },
  demo_link: { type: String },
  badge: { type: String },
  stack_materials: [{ type: String }],
  labels: [{ type: String }],
  meta_tags: [{ type: String }],
  team_members: [{ type: String }]
});

module.exports = mongoose.model("Idea", ideaSchema);
