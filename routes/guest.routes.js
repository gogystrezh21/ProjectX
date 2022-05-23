const { Router } = require("express");
const Collection = require("../models/Collection");
const Item = require("../models/CollectionItem");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth.middleware");
const router = Router();


//last items get for guest .sort({date:-1}).limit(5)

router.get("/lastItems",  async (req, res) => {
  try {
    const items = await Item.find({}).sort({date:-1}).limit(5);
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

// item get for guest

// router.get("/lastItems/:itemId", auth, async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.itemId);
//     res.json(item);
//   } catch (e) {
//     res.status(500).json({ message: "Error" });
//   }
// });

module.exports = router;