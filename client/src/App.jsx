import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import {
	DashboardPage,
	LandingPage,
	RegisterPage,
	ErrorPage,
} from "./pages/index";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<DashboardPage />} />
				<Route path="/landing" element={<LandingPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
