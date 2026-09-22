import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Restaurant menu pages (/restaurants/:slug and /r/:slug) have their own
// in-page back button over the cover photo, so the site navbar is hidden
// there to keep the header clean.
const HIDE_NAVBAR = [/^\/restaurants\/[^/]+$/, /^\/r\/[^/]+$/];

export default function Layout() {
  const location = useLocation();
  const hideNavbar = HIDE_NAVBAR.some((re) => re.test(location.pathname));

  return (
    <div className="flex min-h-screen flex-col">
      {!hideNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
