const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  itemName: {type: String, required:true, unique:true},
  collectionId: {type: Types.ObjectId, ref:'Collection'},
  comments: {type: String, required:true},
  date: {type: Date, default: Date.now},
});

module.exports = model("Item", schema);