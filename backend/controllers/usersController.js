const data = {
	users: require('../model/users.json'),
	setUsers: function (data) { this.users = data }
};

const fsPromises = require('fs').promises;
const path = require('path');

const getAllUsers = (req, res) => {
	res.json(data.users);
}

const getUser = (req, res) => {
	const user = data.users.find(user => user.username === req.params.username);
	if (!user) {
			return res.sendStatus(400).json({ "message": `User with username ${req.params.username} not found` });
	}
	res.json(user);
}

const createNewUser = (req, res) => {
	const newUser = {
		id: data.users?.length ? data.users[data.users.length - 1].id + 1 : 1,
		firstname: req.body.firstname,
		lastname: req.body.lastname
	}

	if (!newUser.firstname || !newUser.lastname) {
		return res.sendStatus(400).json({ 'message': 'First and last names are required.' });
	}

	data.setUsers([...data.users, newUser]);
	res.sendStatus(201).json(data.users);
}

const updateUser = (req, res) => {
	console.log("in update user");
	console.log(req.body.id);
	const user = data.users.find(user => user.id === req.body.id);
	console.log(user);
	if (!user) {
			return res.sendStatus(400).json({ "message": `User ID ${req.body.id} not found` });
	}
	console.log("user found");
	if (req.body.firstname) user.firstname = req.body.firstname;
	if (req.body.lastname) user.lastname = req.body.lastname;
	if (req.body.roles) user.roles = req.body.roles;
	const filteredArray = data.users.filter(user => user.id !== req.body.id);
	const unsortedArray = [...filteredArray, user];
	data.setUsers(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
	res.json(data.users);
}

const deleteUser = async(req, res) => {
	const user = data.users.find(user => user.id === req.body.id);
	if (!user) {
			return res.sendStatus(400).json({ "message": `User ID ${req.body.id} not found` });
	}
	const filteredArray = data.users.filter(user => user.id !== req.body.id);
	data.setUsers(filteredArray);
	await fsPromises.writeFile(
		path.join(__dirname, "..", "model", "users.json"),
		JSON.stringify(data.users)
	);
	res.json(data.users);
}

module.exports = {
	getAllUsers,
	getUser,
	createNewUser,
	updateUser,
	deleteUser,
}