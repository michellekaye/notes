import Typography from '@mui/material/Typography';
import useAuth from '../hooks/useAuth';

const Home = () => {
	const { auth } = useAuth();

	return (
		<>
			<Typography component="h1" variant="h5" gutterBottom>
				Home
			</Typography>

			{auth?.user && (
				<Typography component="h3" variant="h6" gutterBottom>
					You are logged in.
				</Typography>
			)}
		</>

	)
}

export default Home;