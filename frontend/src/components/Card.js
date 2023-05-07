import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const CardComponent = ({ img, title, body, url }) => {
	const handleClick = () => {
		window.open(url, "_blank").focus();
	};

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea onClick={handleClick}>
				<CardMedia component="img" height="250" image={img} />
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{body}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default CardComponent;
