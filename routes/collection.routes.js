const { Router } = require("express");
const Collection = require("../models/Collection");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const { from } = req.body;
    const existing = await Collection.findOne({ from });
    if (existing) {
      return res.json({ collection: existing });
    }
    const collection = new Collection({
      from,
      owner: req.user.userId,
    });

    await collection.save();
    res.status(201).json({ collection });
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const collections = await Collection.find({ owner: req.user.userId });
    res.json(collections);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    res.json(collection);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = router;
