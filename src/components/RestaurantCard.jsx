import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRightIcon, MapPinIcon } from "./Icons";

export default function RestaurantCard({ restaurant, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-3xl border border-hairline bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-[0_24px_48px_-24px_rgba(28,26,23,0.25)]"
    >
      <Link to={`/restaurants/${restaurant.slug}`} className="block">
        <div className="relative h-40 overflow-hidden sm:h-44">
          <img
            src={restaurant.coverImage}
            alt={restaurant.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://picsum.photos/seed/${restaurant.id}/1200/700`;
            }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute -bottom-5 left-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-ink-strong font-display text-[10px] font-extrabold uppercase leading-tight text-cream shadow-md">
            {restaurant.logoInitial}
          </div>
        </div>

        <div className="flex flex-col gap-2 p-5 pt-7">
          <h3 className="font-display text-base font-extrabold text-ink-strong">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 text-xs font-semibold text-muted">
            <MapPinIcon className="h-3.5 w-3.5 text-amber" />
            {restaurant.city}
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {restaurant.description}
          </p>

          <div className="mt-2 flex items-center justify-end">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber text-white transition-transform group-hover:scale-105">
              <ArrowUpRightIcon className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
