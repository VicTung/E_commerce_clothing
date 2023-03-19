import { Route, Routes } from "react-router-dom";
import Authentication from "./routes/authentication";
import Category from "./routes/category";
import Checkout from "./routes/checkout";
import Home from "./routes/home";
import Navigation from "./routes/navigation";
import Shop from "./routes/shop";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="shop/*" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
}

export default App;
