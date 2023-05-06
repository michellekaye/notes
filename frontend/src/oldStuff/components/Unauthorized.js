import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import Typography from '@mui/material/Typography';

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

	return (
		<Container className="login" component="section" maxWidth="xs">
			<Card variant="outlined" className="login__card">
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <GppMaybeIcon />
				</Avatar>
				
				<Typography component="h1" variant="h5" gutterBottom>
					Unauthorized
				</Typography>

				<p>
					You do not have access to the requested page.
				</p>

				<Button variant="contained" onClick={goBack}>Go back</Button>
			</Card>
		</Container>
    )
}

export default Unauthorized;