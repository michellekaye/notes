import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

const SiteMap = () => {
	return (
		<>
			<Typography component="h1" variant="h5" gutterBottom>
				Sitemap
			</Typography>

			<Typography component="h2" variant="h6" gutterBottom>
				Public
			</Typography>
			<Stack spacing={2}>
				<Link href="/login">Login</Link>
				<Link href="/register">Register</Link>
			</Stack>

			<Typography component="h2" variant="h6" gutterBottom>
				Private
			</Typography>
			<Stack spacing={2}>
				<Link href="/">Home</Link>
				<Link href="/admin">Admin</Link>
				<Link href="/profile">Profile</Link>
			</Stack>
		</>

	)
}

export default SiteMap;