const Note = require("../model/Note");

const getAllNotes = async (req, res) => {
	const notes = await Note.find();
	if (!notes) return res.status(204).json({ message: "No notes found." });
	res.json(notes);
};

const createNote = async (req, res) => {
	const { user, title, note } = req.body;

	try {
		const result = await Note.create({
			author: user,
			title: title,
			note: note,
		});
		res.status(201).json(result);
	} catch (err) {
		console.error(err);
	}
};

const deleteNote = async (req, res) => {
	if (!req?.body?.id)
		return res.status(400).json({ message: "Note ID required." });

	const note = await Note.findOne({ _id: req.body.id }).exec();
	if (!note) {
		return res
			.status(204)
			.json({ message: `No note matches ID ${req.body.id}.` });
	}
	const result = await note.deleteOne(); //{ _id: req.body.id }
	res.json(result);
};

module.exports = {
	getAllNotes,
	createNote,
	deleteNote,
};
