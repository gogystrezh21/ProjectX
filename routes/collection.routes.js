const { Router } = require("express");
const Collection = require("../models/Collection");
const Item = require("../models/CollectionItem");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth.middleware");
const router = Router();

//collections get

router.get("/", auth, async (req, res) => {
  try {
    const collections = await Collection.find({ owner: req.user.userId });
    res.json(collections);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

//collection get

router.get("/:id", auth, async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    res.json(collection);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

//collection add

router.post("/generate", auth, async (req, res) => {
  try {
    const { collectionName, collectionDescription, collectionTopic} = req.body;
    const existingCollection = await Collection.findOne({ collectionName });
    if (existingCollection) {
      return res
        .status(400)
        .json({ message: "Collection with this name is exsist" });
    }
    const collection = new Collection({
      collectionName,
      collectionTopic,
      collectionDescription,
      owner: req.user.userId,
    });
    await collection.save();
    res.status(201).json({ collection });
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Error" });
  }
});

//collection edit

router.post("/edit/:id", auth, async (req, res) => {
  try {
    const collectionFields = req.body;
    const collectionId = req.params.id;
    await Collection.findOneAndUpdate({_id:collectionId }, {$set: collectionFields});
    const collections = await Collection.find({ owner: req.user.userId });
    res.status(201).json(collections);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

//collection delete

router.delete("/:id", auth, async (req, res) => {
  try {  
    await Item.find({ collectionId: req.params.id }).remove();
    const collection = await Collection.findByIdAndRemove(req.params.id);
    const collections = await Collection.find({ owner: req.user.userId });
    if (!collection) return res.status(404).json({ message: 'Collection has not found'});
    res.json(collections);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

//items get

router.get("/:id/allItems", auth, async (req, res) => {
  try {
    const items = await Item.find({ collectionId: req.params.id });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

//item get

router.get("/:id/:itemId", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

//item add

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

//item delete

router.delete("/:id/:itemId", auth, async (req, res) => {
  try {  
    await Comment.find({ itemId: req.params.itemId }).remove();
    const item = await Item.findByIdAndRemove(req.params.itemId);
    const items = await Item.find({ collectionId: req.params.id  });
    if (!item) return res.status(404).json({ message: 'Item has not found'});
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

//item edit

router.post("/edit/:id/:itemId", auth, async (req, res) => {
  try {
    const ItemFields = req.body;
    const itemId = req.params.itemId;
    await Item.findOneAndUpdate({collectionId: req.params.id, _id:itemId  }, {$set: ItemFields});
    const items = await Item.find({ collectionId: req.params.id });
    res.status(201).json(items);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});


//comments get

router.get("/:id/:itemId/allComments", auth, async (req, res) => {
  try {
    const comments = await Comment.find({ itemId: req.params.itemId });
    res.json(comments);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

//comment add

router.post("/:id/:itemId/createComment", auth, async (req, res) => {
  try {
    const { commentText } = req.body;
    const comment = new Comment({
      commentText,
      itemId: req.params.itemId
    });
    await comment.save();
    await Comment.find({ itemId: req.params.itemId });
    res.status(201).json({ message: "Comment was created" });
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});



module.exports = router;
