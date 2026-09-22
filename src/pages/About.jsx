import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
      <Reveal className="flex flex-col gap-4">
        <span className="font-mono text-[11px] font-bold tracking-wide text-muted">
          ABOUT DINE3D
        </span>
        <h1 className="font-display text-3xl font-extrabold text-ink-strong sm:text-4xl">
          A discovery layer for restaurants, not another ordering app
        </h1>
        <p className="text-[15px] leading-relaxed text-muted">
          Dine3D is a premium restaurant discovery and digital menu platform. Diners scan a QR code
          or search the platform to open a restaurant's public menu — browse categories, see real
          photography and pricing, and explore signature dishes as interactive 3D models. No cart,
          no checkout, no accounts. Just a beautiful way to see what a restaurant actually serves
          before you sit down.
        </p>
      </Reveal>

      <Reveal delay={0.05} id="qr" className="mt-16 flex flex-col gap-4">
        <h2 className="font-display text-2xl font-extrabold text-ink-strong">How QR works</h2>
        <p className="text-[15px] leading-relaxed text-muted">
          Every restaurant on Dine3D is issued a unique QR code that resolves to its public menu
          URL — for example <code className="rounded bg-chip px-1.5 py-0.5 text-sm">dine3d.app/r/burger-lab</code>.
          Scanning it opens the restaurant straight to its menu, with no table-specific logic, login,
          or app install required.
        </p>
        <ol className="mt-2 grid gap-3 sm:grid-cols-2">
          {[
            "Customer scans the restaurant QR code",
            "Browser opens the restaurant's public menu URL",
            "Menu loads with categories and products",
            "Tapping a product opens image, price & 3D model",
          ].map((step, i) => (
            <li
              key={step}
              className="flex items-start gap-3 rounded-2xl border border-hairline bg-white p-4"
            >
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-navy-tint font-display text-[11px] font-bold text-navy-tint-text">
                {i + 1}
              </span>
              <span className="text-sm text-ink-strong">{step}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={0.1} className="mt-16 flex flex-col gap-4">
        <h2 className="font-display text-2xl font-extrabold text-ink-strong">
          What Dine3D is not
        </h2>
        <p className="text-[15px] leading-relaxed text-muted">
          Dine3D intentionally does not include carts, checkout, payments, billing, customer
          accounts, delivery, or table management — it's a focused discovery and menu experience,
          built to load fast the moment a QR code is scanned.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-16">
        <Link
          to="/restaurants"
          className="inline-block rounded-full bg-amber px-7 py-4 font-display text-sm font-bold text-white"
        >
          Explore Restaurants →
        </Link>
      </Reveal>
    </div>
  );
}
