import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
	console.log("Route protected");
	const { user } = useAppContext();
	if (user) {
		return children;
	}
	return <Navigate to="/landing" />;
};

export default ProtectedRoute;
