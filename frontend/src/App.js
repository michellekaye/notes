import { Routes, Route } from "react-router-dom";
import Admin from './components/Admin';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import Layout from "./components/Layout";
import Login from './components/Login';
import Missing from "./components/Missing";
import Profile from './components/Profile';
import Unauthorized from './components/Unauthorized';
import Registration from './components/Registration';
import RequireAuth from './components/RequireAuth';
import SiteMap from './components/SiteMap';
import Users from './components/Users';
import User from './components/User';
import PersistLogin from './components/PersistLogin';
import './App.css';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes*/}
        <Route path="/" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Registration />} />
				<Route path="sitemap" element={<SiteMap />} />
				<Route path="unauthorized" element={<Unauthorized />} />
			</Route>

			<Route element={<PersistLogin />}>
				<Route element={<AdminDashboard />}>
					{/* protected routes*/}
					<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
						<Route path="admin" element={<Admin />} />
					</Route>

					<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
						<Route path="users" element={<Users />}>
							<Route path=':username' element={<User />} />
						</Route>

					</Route>

					<Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
						<Route path="profile" element={<Profile />} />
					</Route>
				</Route>
			</Route>


			<Route path="/" element={<Layout />}>
				{/* catch all */}
				<Route path="*" element={<Missing />} />
			</Route>
		</Routes>
  );
}

export default App;
