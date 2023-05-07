import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import useAuth from "../hooks/useAuth";

const USERS_URL = "/users";
const ROLES_LIST = {
	Admin: 5150,
	Editor: 1984,
	User: 2001,
};

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Users = () => {
	const [user, setUser] = useState();
	const axiosPrivate = useAxiosPrivate();
	const { auth } = useAuth();

	const [username, setUsername] = useState("");
	const [validName, setValidName] = useState(false);

	const [pwd, setPwd] = useState("");
	const [validPwd, setValidPwd] = useState(false);

	const [matchPwd, setMatchPwd] = useState("");
	const [validMatch, setValidMatch] = useState(false);

	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("submit");
	};

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const getUsers = async () => {
			try {
				const response = await axiosPrivate.get(USERS_URL, {
					signal: controller.signal,
				});
				isMounted && setUser(response.data);
			} catch (err) {
				if (!err?.response) {
					setErrMsg("No Server Response");
				} else if (err.response?.status === 400) {
					setErrMsg("Bad request");
				} else if (err.response?.status === 401) {
					setErrMsg("Unauthorized to view profile.");
				} else {
					setErrMsg("Something went wrong.");
				}
			}
		};

		getUsers();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	useEffect(() => {
		setUsername(user?.username);
	}, [user]);

	useEffect(() => {
		setValidName(USER_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	return (
		<>
			<Typography component="h2" variant="h5" gutterBottom>
				Profile
			</Typography>

			{errMsg && (
				<Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}>
					<Alert severity="error">{errMsg}</Alert>
				</Stack>
			)}
			<form onSubmit={handleSubmit}>
				<TextField
					margin="normal"
					id="username"
					label="Username"
					name="username"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<br />
				<Button type="submit" variant="contained">
					Save profile
				</Button>
			</form>
		</>
	);
};

export default Users;
