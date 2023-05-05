import Typography from '@mui/material/Typography';
import useAuth from '../hooks/useAuth';

const Profile = ({ children }) => {
	const { auth } = useAuth();
	console.log(auth);

	return (
		<>
			<Typography component="h1" variant="h5" gutterBottom>
				{ auth.user }
			</Typography>
		</>
	)
}

export default Profile;