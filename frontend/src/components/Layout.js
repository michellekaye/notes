import { Outlet } from "react-router-dom";
import Container from '@mui/material/Container';

const Layout = () => {
	return (
		<Container className="App" component="main" maxWidth="xs">
			<Outlet />
		</Container>
	)
}

export default Layout;