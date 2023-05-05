import { Routes, Route } from "react-router-dom";
import Admin from './components/Admin';
import Home from './components/Home';
import Layout from "./components/Layout";
import Login from './components/Login';
import Missing from "./components/Missing";
import Profile from './components/Profile';
import Unauthorized from './components/Unauthorized';
import Registration from './components/Registration';
import './App.css';

function App() {
  return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes*/}
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Registration />} />
				<Route path="unauthorized" element={<Unauthorized />} />
				
				{/* protected routes */}
				<Route path="/" element={<Home />} />
				<Route path="admin" element={<Admin />} />
				<Route path="profile" element={<Profile />} />

				{/* catch all */}
				<Route path="*" element={<Missing />} />
			</Route>
		</Routes>
  );
}

export default App;
