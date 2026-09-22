import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCard({ restaurantSlug, product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
      whileHover={{ y: -4 }}
      className="group min-w-0 overflow-hidden rounded-2xl border border-hairline bg-white transition-shadow hover:shadow-[0_20px_40px_-24px_rgba(23,23,23,0.25)]"
    >
      <Link
        to={`/restaurants/${restaurantSlug}/product/${product.slug}`}
        className="flex h-full flex-col"
      >
        <div className="relative h-28 w-full min-w-0 overflow-hidden sm:h-44">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://picsum.photos/seed/${product.id}/600/600`;
            }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.model && (
            <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 font-display text-[9px] font-bold text-amber-deep shadow-sm backdrop-blur sm:right-2.5 sm:top-2.5 sm:px-2.5 sm:py-1 sm:text-[10px]">
              3D
            </span>
          )}
          {!product.isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink-strong/55">
              <span className="rounded-full bg-white px-2.5 py-1 font-display text-[9px] font-bold text-ink-strong sm:px-3 sm:text-[11px]">
                Unavailable
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1 p-2.5 sm:gap-1.5 sm:p-4">
          <div className="flex items-start justify-between gap-1.5">
            <h4 className="font-display text-[12px] font-bold leading-snug text-ink-strong sm:text-[15px]">
              {product.name}
            </h4>
            <span className="whitespace-nowrap font-display text-[12px] font-extrabold text-amber-deep sm:text-[15px]">
              ${product.price}
            </span>
          </div>
          <p className="hidden text-[13px] leading-relaxed text-muted line-clamp-2 sm:block">
            {product.description}
          </p>
          <span className="mt-1 w-full rounded-full border border-hairline-strong py-1.5 text-center font-display text-[10px] font-bold uppercase tracking-wide text-ink-strong transition-colors group-hover:border-ink-strong sm:mt-2 sm:py-2 sm:text-xs">
            View Details
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
