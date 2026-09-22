import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHatIcon, SearchIcon, ArrowRightIcon } from "./Icons";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/restaurants", label: "Restaurants" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "pt-4 px-4" : "pt-0 px-0"}`}>
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 py-4 transition-all md:px-8 ${
          scrolled
            ? "glass rounded-full border border-hairline py-3 shadow-[0_8px_30px_-12px_rgba(23,23,23,0.18)] md:px-6"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <ChefHatIcon className="h-8 w-8 text-amber" />
          <span className="font-display text-xl font-extrabold tracking-tight text-ink-strong">
            Dine3D
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `relative pb-1 font-display text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-ink-strong after:absolute after:inset-x-0 after:-bottom-[3px] after:h-[2px] after:rounded-full after:bg-amber"
                    : "text-muted-soft hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/restaurants"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline-strong text-ink-strong transition-colors hover:border-ink-strong"
            aria-label="Search restaurants"
          >
            <SearchIcon className="h-[18px] w-[18px]" />
          </Link>
          <Link
            to="/restaurants"
            className="flex items-center gap-1.5 rounded-full bg-amber px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_8px_20px_-8px_oklch(0.64_0.16_45_/_0.7)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_oklch(0.64_0.16_45_/_0.75)]"
          >
            Explore Restaurants
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-chip text-ink md:hidden"
          aria-label="Toggle menu"
        >
          <span className="font-display text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-hairline bg-cream shadow-[0_8px_30px_-12px_rgba(23,23,23,0.18)] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-3 font-display text-[15px] font-semibold ${
                      isActive ? "bg-chip text-ink-strong" : "text-muted-soft"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/restaurants"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-amber px-5 py-3.5 font-display text-sm font-bold text-white"
              >
                Explore Restaurants
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
