import { Link } from "react-router-dom";
import { ChefHatIcon, FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from "./Icons";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/restaurants", label: "Restaurants" },
  { to: "/about", label: "About" },
];

const SOCIALS = [
  { icon: FacebookIcon, label: "Facebook" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: XIcon, label: "X" },
  { icon: YoutubeIcon, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <Link to="/" className="flex items-center gap-2">
              <ChefHatIcon className="h-6 w-6 text-amber" />
              <span className="font-display text-lg font-extrabold text-ink-strong">Dine3D</span>
            </Link>
            <span className="text-xs text-muted">Good Food. Better Experience.</span>
          </div>

          <nav className="flex items-center gap-8">
            {NAV.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-display text-sm font-semibold text-muted-soft transition-colors hover:text-ink-strong"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="font-display text-xs font-bold text-muted">Follow Us</span>
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline-strong text-ink-strong transition-colors hover:border-ink-strong"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-hairline pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} Dine3D. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
