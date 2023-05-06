import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const USERS_URL = '/users';
const ROLES_LIST = {
    "Admin": 5150,
    "Editor": 1984,
    "User": 2001
}

const Users = () => {
	const { auth } = useAuth();
	const [users, setUsers] = useState([]);
	const [errMsg, setErrMsg] = useState('');
	
	const getUsers = async () => {
		const config = {
				headers: { Authorization: `Bearer ${auth.accessToken}` }
		};

		try {
			const response = await axios.get(USERS_URL,
				config,
			);
			setUsers(response?.data);
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg("Bad request");
			} else if (err.response?.status === 401) {
				setErrMsg("Unauthorized to view users.");
			} else {
				setErrMsg("Something went wrong.")
			}
		}
	}

	const deleteUser = async (id) => {
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

			setUsers(response?.data);

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

	const updateUser = async (role, id) => {
		const config = {
			headers: { Authorization: `Bearer ${auth.accessToken}` },
			data: {
				id: id,
				roles: {
					[role]: ROLES_LIST[role],
				},
			}
		};

		try {
			const response = await axios.put(USERS_URL,
				config,
			);

			console.log(response);

			setUsers(response?.data);

		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg("Bad request");
			} else if (err.response?.status === 401) {
				setErrMsg("Unauthorized to edit user.");
			} else {
				setErrMsg("Something went wrong.")
			}
		}
	}

	useEffect(() => {
		getUsers();
	}, [])

	return (
		<>
			<section className="users-table">
				<Typography component="h2" variant="h5" gutterBottom>
					Users
				</Typography>

				{errMsg && (
					<Stack sx={{ width: '100%', marginBottom: "1rem" }} spacing={2}>
						<Alert severity="error">{errMsg}</Alert>
					</Stack>
				)}

				<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Username</TableCell>
							<TableCell>Roles</TableCell>
							{/* <TableCell>Edit</TableCell> */}
							<TableCell align="right">Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<TableRow
								key={user.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{user.id}
								</TableCell>
								<TableCell component="th" scope="row">
									{user.username}
								</TableCell>
								<TableCell>
									<Stack direction="row" spacing={1}>
									{
											Object.keys(ROLES_LIST).map((role) => {
												return (
													<Chip
														label={role}
														variant={Object.keys(user.roles).includes(role.toString()) ? "default" : "outlined"}
														color={Object.keys(user.roles).includes(role.toString()) ? "primary" : "default"}
														clickable
														onClick={() => updateUser(role, user.id)}
													/>
												)
										})
									}
									</Stack>
								</TableCell>
								{/* <TableCell>
									<IconButton aria-label="edit" href={`/users/${user.username}`}>
										<EditIcon />
									</IconButton>
								</TableCell> */}
								<TableCell align="right">
									<IconButton aria-label="delete" onClick={() => deleteUser(user.id)}>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				</TableContainer>
			</section>

			<Outlet />
		</>
	)
}

export default Users;