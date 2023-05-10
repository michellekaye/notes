import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "./Home.css";

const NOTES_URL = "http://localhost:3500/notes";

const Home = () => {
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const axiosPrivate = useAxiosPrivate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !note) {
			setErrMsg("Invalid Entry");
			return;
		}
		try {
			const response = await axiosPrivate.post(
				NOTES_URL,
				JSON.stringify({ title, note }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			//clear state and controlled inputs
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

	return (
		<>
			<Typography component="h2" variant="h5" gutterBottom>
				Notes
			</Typography>

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
						<Paper>
							<p>testing</p>
						</Paper>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default Home;
