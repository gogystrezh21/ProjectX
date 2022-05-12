const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  collectionName: {type: String, required:true, unique:true},
  // to: {type: String, required:true, unique:true},
  // code: {type: String, required:true, unique:true},
  date: {type: String, default: Date.now},
  clicks: {type: Number, default:0},
  owner: {type: Types.ObjectId, ref:'User'}
});

module.exports = model("Collection", schema);
