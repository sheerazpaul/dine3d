import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import { MapPinIcon, ChevronIcon } from "../components/Icons";
import { getRestaurant } from "../data/mock";

export default function RestaurantMenu() {
  const { restaurantSlug } = useParams();
  const restaurant = getRestaurant(restaurantSlug);
  const [activeCategory, setActiveCategory] = useState(0);

  if (!restaurant) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-serif text-2xl font-semibold text-ink-strong">
          Restaurant not found
        </h1>
        <Link to="/restaurants" className="mt-4 inline-block text-sm font-semibold text-amber-deep">
          ← Back to restaurants
        </Link>
      </div>
    );
  }

  const category = restaurant.categories[activeCategory];

  return (
    <div>
      <div className="relative h-52 w-full overflow-hidden sm:h-72 md:h-96">
        <motion.img
          key={restaurant.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src={restaurant.coverImage}
          alt={restaurant.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://picsum.photos/seed/${restaurant.id}/1200/700`;
          }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-strong/75 via-ink-strong/15 to-transparent" />

        <div className="absolute inset-x-0 top-0 mx-auto flex max-w-7xl items-center justify-between px-5 pt-5 md:px-8">
          <Link
            to="/restaurants"
            className="flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-2 font-display text-xs font-bold text-white backdrop-blur transition-colors hover:bg-white/25"
          >
            <ChevronIcon className="h-3.5 w-3.5 rotate-180" />
            Restaurants
          </Link>
          <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-2 font-display text-xs font-bold text-white backdrop-blur">
            ★ {restaurant.rating}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="relative z-10 -mt-14 flex flex-col items-start gap-4 sm:-mt-16 sm:flex-row sm:items-end">
          <div className="flex h-20 w-20 flex-none items-center justify-center rounded-2xl border-4 border-cream bg-ink-strong font-display text-2xl font-extrabold uppercase text-cream shadow-lg sm:h-24 sm:w-24">
            {restaurant.logoInitial}
          </div>
          <div className="pb-1">
            <h1 className="font-serif text-3xl font-semibold text-ink-strong sm:text-4xl">
              {restaurant.name}
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-muted-soft">
              <span className="text-amber-deep">{restaurant.cuisine}</span>
              <span className="flex items-center gap-1">
                <MapPinIcon className="h-3.5 w-3.5 text-amber" />
                {restaurant.city}
              </span>
            </div>
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="relative z-10 mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">
            {restaurant.description}
          </p>
        </Reveal>

        <div className="no-scrollbar sticky top-0 z-20 mt-8 flex gap-2 overflow-x-auto bg-cream py-3">
          {restaurant.categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(i)}
              className={`flex-none whitespace-nowrap rounded-full px-5 py-2.5 font-display text-sm font-bold transition-colors ${
                i === activeCategory
                  ? "bg-amber text-white shadow-[0_8px_20px_-10px_rgba(244,91,42,0.7)]"
                  : "bg-chip text-ink-strong hover:bg-hairline-strong"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="border-b border-hairline" />

        <div className="py-8">
          <AnimatePresence mode="wait">
            {category.products.length > 0 ? (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
              >
                {category.products.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    restaurantSlug={restaurant.slug}
                    product={product}
                    index={i}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`${category.id}-empty`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2 py-16 text-center"
              >
                <span className="font-display text-sm font-bold text-ink-strong">
                  Nothing here yet
                </span>
                <p className="text-sm text-muted">No items in this category yet.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
