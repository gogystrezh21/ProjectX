const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  commentText: {type: String, required:true, unique:true},
  itemId: {type: Types.ObjectId, ref:'Item'},
  date: {type: Date, default: Date.now},
});

module.exports = model("Comment", schema);