import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import { LandingPage, RegisterPage, ErrorPage, ProtectedRoute } from "./pages";
import {
	AddJob,
	AllJob,
	Profile,
	SharedLayout,
	Stats,
} from "./pages/dashboard";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<SharedLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Stats />} />
					<Route path="add-job" element={<AddJob />} />
					<Route path="profile" element={<Profile />} />
					<Route path="all-job" element={<AllJob />} />
				</Route>
				<Route path="/landing" element={<LandingPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="*" element={<ErrorPage/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
