const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/complaintController");
const multer = require("multer");

// 📦 STORAGE CONFIG
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// =========================
// CREATE (with image)
// =========================
router.post("/", upload.single("image"), ctrl.create);

// =========================
// GET ALL
// =========================
router.get("/", ctrl.getAll);

// =========================
// GET BY TRACKING ID
// =========================
router.get("/:id", ctrl.getOne);

// =========================
// UPDATE (RESOLVE + PROOF)
// =========================
router.put("/:id", upload.single("proof"), ctrl.update); // ✅ IMPORTANT

module.exports = router;