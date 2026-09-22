import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import RestaurantMenu from "./pages/RestaurantMenu";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Routes>
      {/* Admin dashboard has its own sidebar chrome, no public navbar/footer */}
      <Route path="/admin" element={<Admin />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:restaurantSlug" element={<RestaurantMenu />} />
        <Route
          path="/restaurants/:restaurantSlug/product/:productSlug"
          element={<ProductDetail />}
        />
        {/* QR entry point — resolves straight to the public menu */}
        <Route path="/r/:restaurantSlug" element={<RestaurantMenu />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}
