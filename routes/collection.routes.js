const { Router } = require("express");
const Collection = require("../models/Collection");
const Item = require("../models/CollectionItem");
const auth = require("../middleware/auth.middleware");
const router = Router();

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

router.post("/generate", auth, async (req, res) => {
  try {
    const { collectionName } = req.body;
    const existingCollection = await Collection.findOne({ collectionName });
    if (existingCollection) {
      return res
        .status(400)
        .json({ message: "Collection with this name is exsist" });
    }
    const collection = new Collection({
      collectionName,
      owner: req.user.userId,
    });
    await collection.save();
    res.status(201).json({ collection });
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const collection = await Collection.findById(req.params.id);

//     if (!collection) return res.status(404).json({msg: 'Collection has not found'});
//     await collection.remove();
//     res.status(200).json({ message: "Collection successesfuly deleted" });
//   } catch (e) {
//     res.status(500).json({ message: "Error" });
//   }
// });

router.get("/:id/allItems", auth, async (req, res) => {
  try {
    const items = await Item.find({ collectionId: req.params.id });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/:id/:itemId", auth, async (req, res) => {
  try {
    const item = await Item.findOne({ collectionId:req.params.id, id: req.params.itemId});
    res.json(item);
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Error" });
  }
});

router.post("/:id/createItem", auth, async (req, res) => {
  try {
    const { itemName } = req.body;
    const existingItem = await Item.findOne({ itemName });
    if (existingItem) {
      return res.status(400).json({ message: "Item with this name is exsist" });
      
    }
    const item = new Item({
      itemName,
      collectionId: req.params.id,
    });
    await item.save();
    res.status(201).json({ message: "Item was created" });
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = router;
