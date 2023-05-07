import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Card from "./Card";
import cookImg from "../assets/images/cook-main.jpeg";
import playImg from "../assets/images/play-main.jpeg";
import portfolioImg from "../assets/images/portfolio-main.jpeg";

const apps = [
	{
		img: cookImg,
		title: "Cook",
		body: "Recipe website to help Michelle get started on her cooking journey.",
		url: "http://cook.michelle-kaye.com",
	},
	{
		img: playImg,
		title: "Play",
		body: "A visual library of Michelle's complete board game collection.",
		url: "http://play.michelle-kaye.com",
	},
	{
		img: portfolioImg,
		title: "Portfolio",
		body: "Michelle's online CV, showcasing her work from over the years.",
		url: "http://michelle-kaye.com",
	},
];

const Home = () => {
	return (
		<>
			<Typography component="h2" variant="h5" gutterBottom>
				Home
			</Typography>

			<Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
				{apps.map((app) => (
					<Card img={app.img} title={app.title} body={app.body} url={app.url} />
				))}
			</Stack>
		</>
	);
};

export default Home;
