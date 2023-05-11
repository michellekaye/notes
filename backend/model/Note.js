const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
	createDate: {
		type: Date,
		default: Date.now(),
	},
	title: {
		type: String,
		required: true,
	},
	note: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Note", noteSchema);
