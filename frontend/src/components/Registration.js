import { useState, useEffect } from "react";
import axios from '../api/axios';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import './Registration.css';

const NAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Registration = () => {
	const [name, setName] = useState('');
	const [validName, setValidName] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const result = NAME_REGEX.test(name);
		setValidName(result);
	}, [name]);

	useEffect(() => {
		const result = PWD_REGEX.test(pwd);
		setValidPwd(result);
		const match = pwd === matchPwd;
		setValidMatch(match);
	}, [pwd, matchPwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// if button enabled with JS hack
		const v1 = NAME_REGEX.test(name);
		const v2 = PWD_REGEX.test(pwd);
		if (!v1 || !v2) {
			setErrMsg("Invalid Entry");
			return;
		}
		try {
			const response = await axios.post(REGISTER_URL,
				JSON.stringify({ user: name, pwd }),
				{
						headers: { 'Content-Type': 'application/json' },
						withCredentials: true
				}
			);
			console.log(response?.data);
			console.log(response?.accessToken);
			console.log(JSON.stringify(response))
			setSuccess(true);
			setName('');
			setPwd('');
			setMatchPwd('');
		} catch (err) {
				if (!err?.response) {
						setErrMsg('No Server Response');
				} else if (err.response?.status === 409) {
						setErrMsg('Username is already taken.');
				} else {
						setErrMsg('Registration Failed.')
				}
		}
	}

	return (
		<section className="registration">
			<Card variant="outlined" className="registration__card">
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddIcon />
				</Avatar>
				
				<Typography component="h1" variant="h5" gutterBottom>
					Registration
				</Typography>

				{errMsg && (
					<Stack sx={{ width: '100%', marginBottom: "1rem" }} spacing={2}>
						<Alert fullWidth severity="error">{errMsg}</Alert>
					</Stack>
				)}
				
				{success ? (
					<>
						<p>Registered successfully!</p>
						<Button
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
					</>
				) : (
					<>
						<form onSubmit={(e) => handleSubmit(e)}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoFocus
								error={(!validName && !!name.length)}
								helperText={(!validName && name.length) ? "Invalid username" : "Must start with a letter and be at least 4 characters."}
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
								error={(!validPwd && !!pwd.length)}
								helperText={(!validPwd && pwd.length) ? "Invalid password" : "Must contain a capital letter, number, and special character."}
								onChange={(e) => setPwd(e.target.value)}
							/>

							<TextField
								margin="normal"
								required
								fullWidth
								name="confirmPassword"
								label="Confirm Password"
								type="password"
								id="confirmPassword"
								autoComplete="confirm-password"
								error={(!validMatch && !!matchPwd.length)}
								helperText={(!validMatch && matchPwd.length) ? "Password doesn't match." : ""}
								onChange={(e) => setMatchPwd(e.target.value)}
							/>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								disabled={!validName || !validPwd || !validMatch ? true : false}
								onClick={() => handleSubmit()}
							>
								Sign Up
							</Button>
						</form>
						<Grid container>
							<Grid item>
								<Link href="#" variant="body2">
									{"Already registered? Sign In"}
								</Link>
							</Grid>
						</Grid>
					</>
					)
				}
			</Card>

		</section>
	)
}

export default Registration;