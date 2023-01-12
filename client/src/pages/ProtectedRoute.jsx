import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectedRoute = (props) => {
	const { user } = useAppContext();
	if (user) {
		return props.children;
	}
	return <Navigate to="/landing" />;
};

export default ProtectedRoute;
