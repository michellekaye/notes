import { Outlet } from "react-router-dom";
import "./LayoutMinimal.css";

const Minimal = () => {
	return (
		<div className="minimal">
			<Outlet />
		</div>
	)
}

export default Minimal;