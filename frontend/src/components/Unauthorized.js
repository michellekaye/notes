import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

const Unauthorized = () => {
	return (
		<Container className="unauthorized" component="section" maxWidth="xs">
			<Card variant="outlined" className="minimal__card">
				<Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
					<DoDisturbIcon />
				</Avatar>

				<Typography component="h1" variant="h5" gutterBottom>
					Unauthorized
				</Typography>

				<p>You do not have access to the requested page.</p>
				<br />
				<Button variant="contained" component={Link} to="/login" fullWidth>
					Sign in
				</Button>
			</Card>
		</Container>
	);
};

export default Unauthorized;
