import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import './Register.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
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
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setSuccess(true);
            //clear state and controlled inputs
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <Container className="registration" component="section" maxWidth="xs">
			<Card variant="outlined" className="registration__card">
				<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <       PersonAddIcon />
				</Avatar>
				
				<Typography component="h1" variant="h5" gutterBottom>
					Registration
				</Typography>

				{errMsg && (
					<Stack sx={{ width: '100%', marginBottom: "1rem" }} spacing={2}>
						<Alert severity="error">{errMsg}</Alert>
					</Stack>
				)}
				
				{success ? (
					<>
						<p>Registered successfully!</p>
						<Button
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							href="/login"
						>
							Sign In
						</Button>
					</>
				) : (
					<>
						<form onSubmit={handleSubmit}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoFocus
								error={(!validName && !!user.length)}
								helperText={(!validName && user.length) ? "Invalid username" : "Must start with a letter and be at least 4 characters."}
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
							>
								Sign Up
							</Button>
						</form>
						<Grid container>
							<Grid item>
								<Link href="/login" variant="body2">
									{"Already registered? Sign In"}
								</Link>
							</Grid>
						</Grid>
					</>
					)
				}
			</Card>
		</Container>
    )
}

export default Register
