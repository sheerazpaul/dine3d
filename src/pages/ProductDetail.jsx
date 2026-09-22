import { Link, useParams } from "react-router-dom";
import Reveal from "../components/Reveal";
import ModelViewer from "../components/ModelViewer";
import { getProduct } from "../data/mock";

export default function ProductDetail() {
  const { restaurantSlug, productSlug } = useParams();
  const found = getProduct(restaurantSlug, productSlug);

  if (!found) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-extrabold text-ink-strong">Product not found</h1>
        <Link to="/restaurants" className="mt-4 inline-block text-sm font-semibold text-amber-deep">
          ← Back to restaurants
        </Link>
      </div>
    );
  }

  const { restaurant, category, product } = found;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
      <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-muted">
        <Link to="/restaurants" className="hover:text-ink">Restaurants</Link>
        <span>/</span>
        <Link to={`/restaurants/${restaurant.slug}`} className="hover:text-ink">
          {restaurant.name}
        </Link>
        <span>/</span>
        <span className="text-ink-strong">{product.name}</span>
      </div>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <Reveal>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-hairline">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://picsum.photos/seed/${product.id}/800/800`;
              }}
              className="h-full w-full object-cover"
            />
            {!product.isAvailable && (
              <div className="absolute inset-0 flex items-center justify-center bg-ink-strong/55">
                <span className="rounded-full bg-white px-4 py-2 font-display text-sm font-bold text-ink-strong">
                  Currently unavailable
                </span>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-5">
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-wide text-amber-deep">
              {category.name}
            </span>
            <div className="mt-2 flex items-start justify-between gap-4">
              <h1 className="font-display text-2xl font-extrabold text-ink-strong sm:text-3xl">
                {product.name}
              </h1>
              <span className="whitespace-nowrap font-display text-2xl font-extrabold text-amber-deep">
                ${product.price}
              </span>
            </div>
          </div>

          <p className="text-[15px] leading-relaxed text-muted">{product.description}</p>

          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                product.isAvailable ? "bg-emerald-500" : "bg-hairline-strong"
              }`}
            />
            <span className="font-display text-sm font-semibold text-ink-strong">
              {product.isAvailable ? "Available now" : "Currently unavailable"}
            </span>
          </div>

          <div className="rounded-2xl border border-hairline bg-white p-4">
            <div className="font-display text-xs font-bold uppercase tracking-wide text-muted">
              From {restaurant.name}
            </div>
            <Link
              to={`/restaurants/${restaurant.slug}`}
              className="mt-1 block font-display text-sm font-bold text-ink-strong hover:underline"
            >
              {restaurant.name} · {restaurant.city} →
            </Link>
          </div>

          {product.model && <ModelViewer modelUrl={product.model} productName={product.name} />}
        </Reveal>
      </div>
    </div>
  );
}
