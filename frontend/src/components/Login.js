import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LoginIcon from '@mui/icons-material/Login';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import './Login.css';

const LOGIN_URL = '/auth';

const Login = () => {
	const { setAuth, auth } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const [name, setName] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');

	useEffect(() => {
		setErrMsg('');
	}, [name, pwd])

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(LOGIN_URL,
				JSON.stringify({ user: name, pwd }),
				{
						headers: { 'Content-Type': 'application/json' },
						withCredentials: true
				}
			);

			const accessToken = response?.data?.accessToken;
			const roles = response?.data?.roles;
			
			setAuth({ user: name, pwd, roles, accessToken });

			setName('');
			setPwd('');
			alert("Success!");
			navigate(from, { replace: true });
		} catch (err) {
				if (!err?.response) {
					setErrMsg('No Server Response');
				} else if (err.response?.status === 400) {
					setErrMsg("Missing username or password.");
				} else if (err.response?.status === 401) {
					setErrMsg("Unauthorized");
				} else {
					setErrMsg("Login failed.")
				}
		}
	}

	return (
		<section className="login">
			<Card variant="outlined" className="login__card">
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LoginIcon />
				</Avatar>
				
				<Typography component="h1" variant="h5" gutterBottom>
					Login
				</Typography>

				{errMsg && (
					<Stack sx={{ width: '100%', marginBottom: "1rem" }} spacing={2}>
						<Alert severity="error">{errMsg}</Alert>
					</Stack>
				)}
			
				<form onSubmit={handleSubmit}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoFocus
						onChange={(e) => setName(e.target.value)}
					/>
					
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={(e) => setPwd(e.target.value)}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={!name || !pwd ? true : false}
					>
						Sign In
					</Button>
				</form>
				<Grid container>
					<Grid item>
						<Link href="/register" variant="body2">
							{"Don't have an account? Sign Up"}
						</Link>
					</Grid>
				</Grid>
			</Card>
		</section>
	)
}

export default Login;