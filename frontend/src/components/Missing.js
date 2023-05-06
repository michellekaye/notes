import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import FeedbackIcon from "@mui/icons-material/Feedback";

const Missing = () => {
	return (
		<Container className="missing" component="section" maxWidth="xs">
			<Card variant="outlined" className="minimal__card">
				<Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
					<FeedbackIcon />
				</Avatar>

				<Typography component="h1" variant="h5" gutterBottom>
					Oops!
				</Typography>

				<p>Page not found.</p>
				<br />
				<Button variant="contained" component={Link} to="/" fullWidth>
					Visit our home page.
				</Button>
			</Card>
		</Container>
	);
};

export default Missing;
