import { useRef, useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import './Registration.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Registration = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [validName, setValidName] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const result = USER_REGEX.test(user);
		setValidName(result);
	}, [user])

	useEffect(() => {
		const result = PWD_REGEX.test(pwd);
		setValidPwd(result);
		const match = pwd === matchPwd;
		setValidMatch(match);
	}, [pwd, matchPwd])

	useEffect(() => {
			setErrMsg('');
	}, [user, pwd, matchPwd])

	return (
		<section className="registration">
			<Card variant="outlined" className="registration__card">
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddIcon />
				</Avatar>
				
				<Typography component="h1" variant="h5" gutterBottom>
					Registration
				</Typography>
				
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
						<form onSubmit={() => console.log("submit!")}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoFocus
								error={(!validName && !!user.length)}
								helperText={(!validName && user.length) ? "Invalid username" : ""}
								onChange={(e) => setUser(e.target.value)}
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
								helperText={(!validPwd && pwd.length) ? "Invalid password" : ""}
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