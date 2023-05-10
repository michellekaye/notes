const express = require("express");
const router = express.Router();
const notesController = require("../../controllers/notesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
	.route("/")
	.get(notesController.getAllNotes)
	.post(verifyRoles(ROLES_LIST.User), notesController.createNote)
	.delete(verifyRoles(ROLES_LIST.User), notesController.deleteNote);

module.exports = router;
