import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import Dropdown from "../components/Dropdown";
import { SearchIcon, MapPinIcon } from "../components/Icons";
import {
  BurgerIcon,
  PizzaIcon,
  SkewerIcon,
  BowlIcon,
  NoodleIcon,
  CoffeeCupIcon,
  CupcakeIcon,
} from "../components/Icons";
import { listRestaurants } from "../data/mock";

const CATEGORIES = [
  { label: "Fast Food", icon: BurgerIcon },
  { label: "Italian", icon: PizzaIcon },
  { label: "BBQ", icon: SkewerIcon },
  { label: "Desi", icon: BowlIcon },
  { label: "Chinese", icon: NoodleIcon },
  { label: "Cafe", icon: CoffeeCupIcon },
  { label: "Dessert", icon: CupcakeIcon },
];

function RestaurantGridCard({ restaurant, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -5 }}
      className="group min-w-0 overflow-hidden rounded-2xl border border-hairline bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-[0_24px_48px_-24px_rgba(23,23,23,0.25)] sm:rounded-3xl"
    >
      <Link to={`/restaurants/${restaurant.slug}`} className="block">
        <div className="relative h-24 w-full min-w-0 overflow-hidden sm:h-40">
          <img
            src={restaurant.coverImage}
            alt={restaurant.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://picsum.photos/seed/${restaurant.id}/600/400`;
            }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        <div className="relative flex flex-col items-center gap-1 px-2.5 pb-3 pt-6 text-center sm:gap-2 sm:px-5 sm:pb-5 sm:pt-9">
          <div className="absolute -top-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-ink-strong font-display text-xs font-extrabold uppercase text-cream shadow-md sm:-top-8 sm:h-16 sm:w-16 sm:border-4 sm:text-lg">
            {restaurant.logoInitial}
          </div>

          <h3 className="font-display text-[13px] font-extrabold leading-tight text-ink-strong sm:text-base">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 text-[10px] font-semibold text-muted sm:text-xs">
            <MapPinIcon className="h-3 w-3 text-amber sm:h-3.5 sm:w-3.5" />
            {restaurant.city}
          </div>
          <p className="hidden text-sm leading-relaxed text-muted line-clamp-2 sm:block">
            {restaurant.description}
          </p>

          <span className="mt-1.5 w-full rounded-full border border-hairline-strong py-1.5 font-display text-[10px] font-bold uppercase tracking-wide text-ink-strong transition-colors group-hover:border-ink-strong sm:mt-3 sm:py-2.5 sm:text-xs">
            View Menu
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Restaurants() {
  const all = listRestaurants();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All Cities");
  const [category, setCategory] = useState("All");

  const cities = useMemo(() => ["All Cities", ...new Set(all.map((r) => r.city))], [all]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((r) => {
      const matchesQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q);
      const matchesCity = city === "All Cities" || r.city === city;
      const matchesCategory = category === "All" || r.tag === category;
      return matchesQuery && matchesCity && matchesCategory;
    });
  }, [all, query, city, category]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <Reveal className="text-center">
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-ink-strong sm:text-5xl md:text-6xl">
          Find Your Next Meal
        </h1>
      </Reveal>

      <Reveal delay={0.05} className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            <SearchIcon className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurants..."
            className="w-full rounded-full border border-hairline-strong bg-white py-3.5 pl-11 pr-4 text-sm text-ink placeholder:text-muted-soft focus:outline-none focus:ring-2 focus:ring-amber/30"
          />
        </div>
        <Dropdown value={city} options={cities} onChange={setCity} className="sm:w-52" />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        <Reveal delay={0.08} className="lg:sticky lg:top-24 lg:self-start">
          <div className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-1.5">
            <button
              onClick={() => setCategory("All")}
              className={`flex flex-none items-center gap-3 rounded-2xl px-4 py-3 text-left font-display text-sm font-bold transition-colors ${
                category === "All"
                  ? "bg-amber text-white"
                  : "text-ink-strong hover:bg-chip"
              }`}
            >
              <span className="text-base">◎</span>
              All
            </button>
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const active = category === c.label;
              return (
                <button
                  key={c.label}
                  onClick={() => setCategory(c.label)}
                  className={`flex flex-none items-center gap-3 rounded-2xl px-4 py-3 text-left font-display text-sm font-bold transition-colors ${
                    active ? "bg-amber text-white" : "text-ink-strong hover:bg-chip"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-none" />
                  {c.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="min-w-0">
          <p className="mb-4 text-xs font-semibold text-muted">
            {results.length} restaurant{results.length === 1 ? "" : "s"}
          </p>
          {results.length > 0 ? (
            <div className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-2 xl:grid-cols-3">
              {results.map((restaurant, i) => (
                <RestaurantGridCard key={restaurant.id} restaurant={restaurant} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-sm text-muted">
              No restaurants match "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
