const { v4: uuidv4 } = require("uuid");

const notesDB = {
	notes: require("../model/notes.json"),
	setNotes: function (data) {
		this.notes = data;
	},
};

const fsPromises = require("fs").promises;
const path = require("path");

const getAllNotes = (req, res) => {
	res.json(notesDB.notes);
};

const createNote = async (req, res) => {
	const { userId, note } = req.body;

	//store the new note
	const newNote = {
		id: uuidv4(),
		author: userId,
		note: note,
	};

	notesDB.setNotes([...notesDB.notes, newNote]);
	await fsPromises.writeFile(
		path.join(__dirname, "..", "model", "notes.json"),
		JSON.stringify(notesDB.notes)
	);
	res.status(201).json({ success: `New note created!` });
};

const deleteNote = async (req, res) => {
	const note = notesDB.notes.find((note) => note.id === req.body.id);
	if (!note) {
		return res
			.sendStatus(400)
			.json({ message: `Note ID ${req.body.id} not found` });
	}
	const filteredArray = notesDB.notes.filter((note) => note.id !== req.body.id);
	notesDB.setNotes(filteredArray);
	await fsPromises.writeFile(
		path.join(__dirname, "..", "model", "notes.json"),
		JSON.stringify(notesDB.notes)
	);
	res.json(notesDB.notes);
};

module.exports = {
	getAllNotes,
	createNote,
	deleteNote,
};
