import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import LayoutDashboard from "./components/LayoutDashboard";
import LayoutMinimal from "./components/LayoutMinimal";
import Editor from "./components/Editor";
import Users from "./components/Users";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Lounge from "./components/Lounge";
import LinkPage from "./components/LinkPage";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";

const ROLES = {
	User: 2001,
	Editor: 1984,
	Admin: 5150,
};

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes */}
				<Route element={<LayoutMinimal />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="linkpage" element={<LinkPage />} />
					<Route path="unauthorized" element={<Unauthorized />} />
				</Route>

				{/* we want to protect these routes */}
				<Route element={<PersistLogin />}>
					<Route element={<LayoutDashboard />}>
						<Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
							<Route path="/" element={<Home />} />
						</Route>

						<Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
							<Route path="editor" element={<Editor />} />
						</Route>

						<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
							<Route path="users" element={<Users />} />
						</Route>

						<Route
							element={
								<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
							}
						>
							<Route path="lounge" element={<Lounge />} />
						</Route>
					</Route>
				</Route>

				{/* catch all */}
				<Route element={<LayoutMinimal />}>
					<Route path="*" element={<Missing />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
