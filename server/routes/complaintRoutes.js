const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/complaintController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
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
