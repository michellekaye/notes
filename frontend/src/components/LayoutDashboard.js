import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate, Link as RouterLink } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import "./LayoutDashboard.css";

const drawerWidth = 240;

const Dashboard = (props) => {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const navigate = useNavigate();
	const logout = useLogout();

	const signOut = async () => {
		await logout();
		navigate("/linkpage");
	};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<List>
				{[
					{
						title: "Notes",
						url: "/",
					},
					{
						title: "Users",
						url: "/users",
					},
				].map((link, index) => (
					<ListItem key={link.url} disablePadding>
						<ListItemButton to={link.url} component={RouterLink}>
							<ListItemIcon>
								{index === 0 && <EditIcon />}
								{index === 1 && <GroupIcon />}
							</ListItemIcon>
							<ListItemText primary={link.title} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{[
					{
						title: "Sign out",
						url: "/",
					},
				].map((link, index) => (
					<ListItem key={link.url} disablePadding>
						<ListItemButton to={link.url} component={RouterLink}>
							<ListItemIcon>
								{index === 0 && <LogoutIcon onClick={signOut} />}
							</ListItemIcon>
							<ListItemText primary={link.title} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						michelle-kaye.com
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				className="dashboard__main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
};

export default Dashboard;
