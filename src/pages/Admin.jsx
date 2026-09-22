import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { listRestaurants } from "../data/mock";
import { ChefHatIcon, ChevronIcon } from "../components/Icons";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "restaurants", label: "Restaurants", icon: "⌂" },
  { id: "categories", label: "Categories", icon: "▤" },
  { id: "products", label: "Products", icon: "◎" },
  { id: "qrcodes", label: "QR Codes", icon: "▧" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

function StatusPill({ ok }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 font-display text-[10px] font-bold ${
        ok ? "bg-emerald-50 text-emerald-600" : "bg-chip text-muted"
      }`}
    >
      {ok ? "Published" : "Draft"}
    </span>
  );
}

function RowActions() {
  return (
    <div className="flex items-center gap-2">
      <button className="rounded-full border border-hairline-strong px-3 py-1.5 font-display text-xs font-bold text-ink-strong transition-colors hover:border-ink-strong">
        Edit
      </button>
      <button className="rounded-full border border-hairline-strong px-3 py-1.5 font-display text-xs font-bold text-red-500 transition-colors hover:border-red-300">
        Delete
      </button>
    </div>
  );
}

function DashboardPanel({ restaurants, totalCategories, totalProducts, qrCount }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Restaurants", restaurants.length],
          ["Categories", totalCategories],
          ["Products", totalProducts],
          ["QR Codes", qrCount],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-hairline bg-white p-5">
            <div className="font-serif text-3xl font-semibold text-ink-strong">{value}</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-hairline bg-white p-6">
        <h3 className="font-display text-sm font-bold text-ink-strong">Recently added restaurants</h3>
        <div className="mt-4 flex flex-col divide-y divide-hairline">
          {restaurants.slice(0, 5).map((r) => (
            <div key={r.id} className="flex items-center gap-3 py-3">
              <img
                src={r.coverImage}
                alt={r.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://picsum.photos/seed/${r.id}/80/80`;
                }}
                className="h-10 w-10 flex-none rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="truncate font-display text-sm font-bold text-ink-strong">
                  {r.name}
                </div>
                <div className="text-xs text-muted">{r.city}</div>
              </div>
              <StatusPill ok />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RestaurantsPanel({ restaurants }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-white">
      <div className="flex items-center justify-between border-b border-hairline p-5">
        <h3 className="font-display text-sm font-bold text-ink-strong">Restaurants</h3>
        <button className="rounded-full bg-amber px-4 py-2 font-display text-xs font-bold text-white">
          + New Restaurant
        </button>
      </div>
      <div className="flex flex-col divide-y divide-hairline">
        {restaurants.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center gap-4 p-4">
            <img
              src={r.coverImage}
              alt={r.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://picsum.photos/seed/${r.id}/80/80`;
              }}
              className="h-12 w-12 flex-none rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="font-display text-sm font-bold text-ink-strong">{r.name}</div>
              <div className="text-xs text-muted">
                {r.city} · {r.description}
              </div>
            </div>
            <StatusPill ok />
            <RowActions />
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoriesPanel({ restaurants }) {
  const rows = restaurants.flatMap((r) => r.categories.map((c) => ({ ...c, restaurant: r })));
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-white">
      <div className="flex items-center justify-between border-b border-hairline p-5">
        <h3 className="font-display text-sm font-bold text-ink-strong">Categories</h3>
        <button className="rounded-full bg-amber px-4 py-2 font-display text-xs font-bold text-white">
          + New Category
        </button>
      </div>
      <div className="flex flex-col divide-y divide-hairline">
        {rows.map((c) => (
          <div key={c.id} className="flex flex-wrap items-center gap-4 p-4">
            <div className="min-w-0 flex-1">
              <div className="font-display text-sm font-bold text-ink-strong">{c.name}</div>
              <div className="text-xs text-muted">
                {c.restaurant.name} · {c.products.length} products
              </div>
            </div>
            <RowActions />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsPanel({ restaurants }) {
  const rows = restaurants.flatMap((r) =>
    r.categories.flatMap((c) => c.products.map((p) => ({ ...p, category: c, restaurant: r })))
  );
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-white">
      <div className="flex items-center justify-between border-b border-hairline p-5">
        <h3 className="font-display text-sm font-bold text-ink-strong">Products</h3>
        <button className="rounded-full bg-amber px-4 py-2 font-display text-xs font-bold text-white">
          + New Product
        </button>
      </div>
      <div className="flex flex-col divide-y divide-hairline">
        {rows.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center gap-4 p-4">
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://picsum.photos/seed/${p.id}/80/80`;
              }}
              className="h-12 w-12 flex-none rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="font-display text-sm font-bold text-ink-strong">{p.name}</div>
              <div className="text-xs text-muted">
                {p.restaurant.name} · {p.category.name} · ${p.price}
              </div>
            </div>
            <span className="rounded-full bg-chip px-2.5 py-1 font-display text-[10px] font-bold text-ink-strong">
              {p.model ? "3D model" : "No 3D model"}
            </span>
            <StatusPill ok={p.isAvailable} />
            <RowActions />
          </div>
        ))}
      </div>
    </div>
  );
}

function QRCodesPanel({ restaurants }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {restaurants.map((r) => (
        <div key={r.id} className="flex flex-col items-center gap-4 rounded-2xl border border-hairline bg-white p-6 text-center">
          <div
            className="h-32 w-32 rounded-xl"
            style={{
              backgroundImage:
                "repeating-conic-gradient(#171717 0deg 8deg, #f8f5ee 8deg 16deg)",
              backgroundSize: "14px 14px",
            }}
          />
          <div>
            <div className="font-display text-sm font-bold text-ink-strong">{r.name}</div>
            <div className="text-xs text-muted">dine3d.app{r.qrUrl}</div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full bg-amber px-4 py-2 font-display text-xs font-bold text-white">
              Download QR
            </button>
            <button className="rounded-full border border-hairline-strong px-4 py-2 font-display text-xs font-bold text-ink-strong">
              Regenerate
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="max-w-lg rounded-2xl border border-hairline bg-white p-6">
      <h3 className="font-display text-sm font-bold text-ink-strong">Admin account</h3>
      <div className="mt-4 flex flex-col gap-3">
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted">
          Email
          <input
            type="email"
            disabled
            value="admin@dine3d.app"
            className="rounded-xl border border-hairline-strong bg-cream-soft px-3.5 py-2.5 text-sm text-ink"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted">
          First name
          <input
            type="text"
            disabled
            value="Dine3D"
            className="rounded-xl border border-hairline-strong bg-cream-soft px-3.5 py-2.5 text-sm text-ink"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted">
          Last name
          <input
            type="text"
            disabled
            value="Admin"
            className="rounded-xl border border-hairline-strong bg-cream-soft px-3.5 py-2.5 text-sm text-ink"
          />
        </label>
      </div>
      <p className="mt-4 text-xs text-muted">
        Dine3D has a single admin role — there are no staff or branch accounts.
      </p>
    </div>
  );
}

export default function Admin() {
  const restaurants = listRestaurants();
  const [section, setSection] = useState("dashboard");

  const totalCategories = restaurants.reduce((n, r) => n + r.categories.length, 0);
  const totalProducts = restaurants.reduce(
    (n, r) => n + r.categories.reduce((m, c) => m + c.products.length, 0),
    0
  );

  const panels = {
    dashboard: (
      <DashboardPanel
        restaurants={restaurants}
        totalCategories={totalCategories}
        totalProducts={totalProducts}
        qrCount={restaurants.length}
      />
    ),
    restaurants: <RestaurantsPanel restaurants={restaurants} />,
    categories: <CategoriesPanel restaurants={restaurants} />,
    products: <ProductsPanel restaurants={restaurants} />,
    qrcodes: <QRCodesPanel restaurants={restaurants} />,
    settings: <SettingsPanel />,
  };

  return (
    <div className="flex min-h-screen bg-cream-soft">
      <aside className="hidden w-64 flex-none flex-col border-r border-hairline bg-white px-4 py-6 md:flex">
        <Link to="/" className="flex items-center gap-2 px-2">
          <ChefHatIcon className="h-7 w-7 text-amber" />
          <span className="font-display text-lg font-extrabold text-ink-strong">Dine3D</span>
        </Link>
        <span className="mt-1 px-2 font-display text-[10px] font-bold tracking-wide text-muted">
          ADMIN
        </span>

        <nav className="mt-8 flex flex-col gap-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left font-display text-sm font-semibold transition-colors ${
                section === item.id
                  ? "bg-ink-strong text-cream"
                  : "text-muted-soft hover:bg-cream-soft hover:text-ink-strong"
              }`}
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <Link
          to="/"
          className="mt-auto flex items-center gap-2 px-3 py-2.5 font-display text-sm font-semibold text-muted-soft hover:text-ink-strong"
        >
          <ChevronIcon className="h-4 w-4 rotate-180" />
          Back to site
        </Link>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-hairline bg-white px-6 py-4 md:px-8">
          <div>
            <h1 className="font-serif text-xl font-semibold capitalize text-ink-strong">
              {NAV.find((n) => n.id === section)?.label}
            </h1>
            <p className="text-xs text-muted">Single-admin platform overview</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber font-display text-xs font-bold text-white">
            A
          </div>
        </header>

        <main className="px-6 py-8 md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {panels[section]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
