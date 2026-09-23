import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

// Route-level code splitting — everything except the landing page (which
// must paint immediately) loads on demand. ProductDetail in particular pulls
// in the heavy React Three Fiber / three.js model viewer, so keeping it out
// of the initial bundle meaningfully shrinks first-load JS.
const Restaurants = lazy(() => import("./pages/Restaurants"));
const RestaurantMenu = lazy(() => import("./pages/RestaurantMenu"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const About = lazy(() => import("./pages/About"));

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-hairline-strong border-t-amber" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
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
    </Suspense>
  );
}
