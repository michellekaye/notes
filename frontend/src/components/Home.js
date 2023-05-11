import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import "./Home.css";

const NOTES_URL = "http://localhost:3500/notes";

const Home = () => {
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");
	const [notes, setNotes] = useState([]);
	const [errMsg, setErrMsg] = useState("");
	const { auth } = useAuth();
	const axiosPrivate = useAxiosPrivate();

	const getNotes = async () => {
		try {
			const response = await axiosPrivate.get(NOTES_URL);
			setNotes(response.data);
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 400) {
				setErrMsg("Bad request");
			} else if (err.response?.status === 401) {
				setErrMsg("Unauthorized to view notes.");
			} else {
				setErrMsg("Something went wrong.");
			}
		}
	};

	useEffect(() => {
		getNotes();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !note) {
			setErrMsg("Invalid Entry");
			return;
		}
		try {
			const response = await axiosPrivate.post(
				NOTES_URL,
				JSON.stringify({ title, note, user: auth.user }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);

			console.log(response.data);
			console.log();
			setNotes([...notes, response.data]);
			setTitle("");
			setNote("");
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 409) {
				setErrMsg("Username Taken");
			} else {
				setErrMsg("Registration Failed");
			}
		}
	};

	const orderedNotes = notes.sort(function (a, b) {
		return new Date(b.createdDate) - new Date(a.createdDate);
	});

	return (
		<>
			<Typography component="h2" variant="h5" gutterBottom>
				Notes
			</Typography>

			{errMsg && (
				<Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}>
					<Alert severity="error">{errMsg}</Alert>
				</Stack>
			)}

			<Grid container spacing={2}>
				<Grid xs={12} md={4}>
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							"& > :not(style)": {
								m: 2,
								width: 300,
								height: 300,
							},
						}}
					>
						<Paper elevation={2} className="form">
							<form onSubmit={handleSubmit}>
								<TextField
									id="title"
									label="Title"
									variant="standard"
									fullWidth
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
								<br />
								<br />
								<TextField
									id="note"
									label="Note"
									multiline
									maxRows={4}
									variant="standard"
									fullWidth
									value={note}
									onChange={(e) => setNote(e.target.value)}
								/>
								<br />
								<br />
								<Button
									type="submit"
									variant="contained"
									disabled={!title || !note}
								>
									Save
								</Button>
							</form>
						</Paper>
					</Box>
				</Grid>
				<Grid xs={12} md={8}>
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							"& > :not(style)": {
								m: 2,
								width: "100%",
								maxWidth: 500,
							},
						}}
					>
						{orderedNotes.map((note) => (
							<Paper className="note" key={note.title}>
								<IconButton
									aria-label="delete"
									color="default"
									className="delete"
								>
									<DeleteIcon />
								</IconButton>
								<Typography component="h5" variant="h6" gutterBottom>
									{note.title}
								</Typography>
								<Typography variant="overline" display="block" gutterBottom>
									{Date(note.createdDate)}
								</Typography>
								<Typography component="p" variant="body2" gutterBottom>
									{note.note}
								</Typography>
							</Paper>
						))}
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default Home;
