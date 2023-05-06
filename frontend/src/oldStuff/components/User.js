import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import './User.css';

const USERS_URL = '/users';

const User = () => {
	const { auth } = useAuth();
	const [user, setUser] = useState([]);
	const [errMsg, setErrMsg] = useState('');
	let { username } = useParams();
	
	const getUser = async () => {
		const config = {
			headers: { Authorization: `Bearer ${auth.accessToken}` },
			data: {
				username: username,
			}
		};

		try {
			const response = await axios.get(`${USERS_URL}/${username}`,
				config,
			);
			setUser(response?.data);

			console.log('response');
			console.log(response);
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg("Bad request");
			} else if (err.response?.status === 401) {
				setErrMsg("Unauthorized to view user.");
			} else {
				setErrMsg("Something went wrong.")
			}
		}
	}

	const updateUser = async (id) => {
		console.log(`id: ${id}`);
		const config = {
			headers: { Authorization: `Bearer ${auth.accessToken}` },
			data: {
				id: id,
			}
		};

		try {
			const response = await axios.delete(USERS_URL,
				config,
			);

			setUser(response?.data);

		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg("Bad request");
			} else if (err.response?.status === 401) {
				setErrMsg("Unauthorized to delete user.");
			} else {
				setErrMsg("Something went wrong.")
			}
		}
	}

	useEffect(() => {
		getUser();
	}, [])

	return (
		<section className="edit-user">
			<Typography component="h2" variant="h5" gutterBottom>
				Edit User
			</Typography>

			{errMsg && (
				<Stack sx={{ width: '100%', marginBottom: "1rem" }} spacing={2}>
					<Alert severity="error">{errMsg}</Alert>
				</Stack>
			)}

			<Card variant="outlined" className="edit-user__card">
				<Container className="edit-user__container" component="div" maxWidth="xs">
					<form onSubmit={updateUser}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoFocus
						/>
					</form>
				</Container>
			</Card>
		</section>
	)
}

export default User;