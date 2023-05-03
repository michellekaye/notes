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
	const [userFocus, setUserFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	return (
		<div className="registration">
			<Card variant="outlined" className="registration__card">
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddIcon />
				</Avatar>
				
				<Typography component="h1" variant="h5" gutterBottom>
					Registration
				</Typography>

				<TextField
					margin="normal"
					required
					fullWidth
					id="username"
					label="Username"
					name="username"
					autoFocus
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
				/>

				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Sign Up
				</Button>

				<Grid container>
					<Grid item>
						<Link href="#" variant="body2">
							{"Already registered? Sign In"}
						</Link>
					</Grid>
				</Grid>
			</Card>

		</div>
	)
}

export default Registration;