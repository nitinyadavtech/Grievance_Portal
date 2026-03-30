const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,

  // ✅ ADD THESE
  category: String,
  image: String,
  proof: String,

  status: {
    type: String,
    default: "Pending"
  },

  trackingId: String
});

module.exports = mongoose.model("Complaint", ComplaintSchema);