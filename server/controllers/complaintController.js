const Complaint = require("../models/Complaint");

exports.create = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    // ✅ GENERATE TRACKING ID
    const trackingId = "CMP" + Date.now();

    const newComplaint = new Complaint({
      title,
      description,
      category,
      location,
      trackingId,

      // ✅ HANDLE IMAGE
      image: req.file ? req.file.filename : null,

      status: "Pending"
    });

    await newComplaint.save();

    res.json({
      message: "Complaint Registered",
      trackingId: newComplaint.trackingId
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating complaint" });
  }
};

exports.getAll = async (req, res) => {
  const data = await Complaint.find();
  res.json(data);
};

exports.getOne = async (req, res) => {
  const data = await Complaint.findOne({ trackingId: req.params.id });
  res.json(data);
};

exports.update = async (req, res) => {
  try {
    const updateData = {
      status: req.body.status
    };

    // ✅ HANDLE FILE
    if (req.file) {
      updateData.proof = req.file.filename;
    }

    const data = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating complaint" });
  }
};