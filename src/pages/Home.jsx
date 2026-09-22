import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import RestaurantCard from "../components/RestaurantCard";
import { listRestaurants } from "../data/mock";
import {
  ChevronIcon,
  FlameIcon,
  PlayIcon,
  QRIcon,
  StorefrontIcon,
  ChefHatIcon,
  ArrowRightIcon,
  RotateIcon,
  ZoomIcon,
  DragIcon,
  FullscreenIcon,
} from "../components/Icons";
import heroBg from "../assets/hero-bg.webp";
import heroBurger from "../assets/hero-burger.webp";

const EXPERIENCE_IMAGE = "https://loremflickr.com/900/900/platter?lock=1";

const PANEL_ITEMS = [
  { name: "Chicken Burger", price: "5.99", image: heroBurger },
  { name: "Pizza Special", price: "8.99", seed: "pizza", lock: 4 },
  { name: "French Fries", price: "3.99", seed: "fries", lock: 1 },
];

const STEPS = [
  {
    n: "01",
    icon: QRIcon,
    title: "Scan QR Code",
    body: "Scan the restaurant's QR code on the table or at the entrance.",
  },
  {
    n: "02",
    icon: StorefrontIcon,
    title: "Explore Restaurant",
    body: "View the restaurant's menu and categories.",
  },
  {
    n: "03",
    icon: ChefHatIcon,
    title: "Check Out Products",
    body: "See detailed product information, images and 3D models.",
  },
  {
    n: "04",
    icon: RotateIcon,
    title: "Experience in 3D",
    body: "Rotate, zoom and explore your favorite dishes.",
  },
];

const EXPERIENCE_ACTIONS = [
  [RotateIcon, "Rotate"],
  [ZoomIcon, "Zoom"],
  [DragIcon, "Drag"],
  [FullscreenIcon, "Fullscreen"],
];

export default function Home() {
  const featured = listRestaurants().slice(0, 4);

  return (
    <div className="relative">
      <div
        className="fixed inset-0 -z-10 bg-cream bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="fixed inset-0 -z-10 bg-cream/70" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.05fr_1fr_0.85fr] lg:items-center lg:gap-6 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-6"
          >
            <span className="flex items-center gap-2 font-display text-[11px] font-bold tracking-wide text-amber-deep">
              FOOD <span className="text-hairline-strong">·</span> RESTAURANTS
              <span className="text-hairline-strong">·</span> 3D EXPERIENCE
            </span>
            <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink-strong sm:text-5xl lg:text-[3.6rem]">
              Discover Food.
              <br />
              See It <span className="italic font-medium text-amber">Differently.</span>
            </h1>
            <p className="max-w-md text-[15px] leading-relaxed text-muted">
              Explore the <strong className="text-ink-strong">best restaurants</strong>, browse
              their digital menus, and{" "}
              <strong className="text-ink-strong">experience</strong> food like never before with
              stunning images, prices and interactive 3D models.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                to="/restaurants"
                className="flex items-center gap-1.5 rounded-full bg-amber px-6 py-3.5 font-display text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgba(244,91,42,0.6)] transition-transform hover:-translate-y-0.5"
              >
                Explore Restaurants
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a href="#how-qr-works" className="group flex items-center gap-2.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-hairline-strong text-ink-strong transition-colors group-hover:border-ink-strong">
                  <PlayIcon className="h-3.5 w-3.5 translate-x-[1px]" />
                </span>
                <span className="font-display text-sm font-bold text-ink-strong">
                  How QR Works
                </span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto flex aspect-square w-full max-w-lg items-center justify-center"
          >
            <motion.img
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src={heroBurger}
              alt="Signature cheeseburger — explore in 3D"
              className="relative w-full drop-shadow-[0_30px_50px_rgba(23,23,23,0.2)]"
              draggable={false}
            />

            <button className="absolute left-0 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-hairline-strong bg-white text-ink-strong shadow-sm sm:flex">
              <ChevronIcon className="h-4 w-4 rotate-180" />
            </button>
            <button className="absolute right-0 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-hairline-strong bg-white text-ink-strong shadow-sm sm:flex">
              <ChevronIcon className="h-4 w-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden flex-col gap-2 rounded-3xl border border-hairline bg-white p-3 shadow-[0_24px_48px_-28px_rgba(23,23,23,0.3)] lg:flex"
          >
            <div className="flex items-center gap-3 rounded-2xl bg-navy-tint p-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-amber text-white">
                <FlameIcon />
              </span>
              <div className="min-w-0">
                <div className="font-display text-sm font-bold text-ink-strong">20% OFF</div>
                <div className="text-xs text-muted">Limited Offer</div>
              </div>
              <ChevronIcon className="ml-auto h-4 w-4 flex-none text-muted" />
            </div>

            {PANEL_ITEMS.map((item) => (
              <div key={item.name} className="flex items-center gap-3 rounded-2xl p-2">
                <img
                  src={item.image ?? `https://loremflickr.com/80/80/${item.seed}?lock=${item.lock}`}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://picsum.photos/seed/${item.seed}/80/80`;
                  }}
                  className="h-11 w-11 flex-none rounded-full object-cover"
                />
                <div className="min-w-0">
                  <div className="truncate font-display text-[13px] font-bold text-ink-strong">
                    {item.name}
                  </div>
                  <div className="text-xs text-muted">From ${item.price}</div>
                </div>
                <ChevronIcon className="ml-auto h-4 w-4 flex-none text-hairline-strong" />
              </div>
            ))}

            <div className="mt-1 flex items-end justify-between border-t border-hairline px-1 pt-3">
              <span className="font-serif text-lg italic leading-tight text-ink-strong">
                Fresh Food
                <br />
                Better Mood
              </span>
              <span className="h-[3px] w-8 rounded-full bg-amber" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured restaurants */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 font-display text-[11px] font-bold tracking-wide text-amber-deep">
              <span className="h-[2px] w-4 bg-amber" /> FEATURED RESTAURANTS
            </span>
            <h2 className="font-serif text-2xl font-semibold text-ink-strong sm:text-3xl">
              Featured Restaurants
            </h2>
          </div>
          <Link
            to="/restaurants"
            className="flex items-center gap-1 font-display text-sm font-bold text-amber-deep"
          >
            View All
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((restaurant, i) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} index={i} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <Reveal className="mb-12 flex flex-col gap-2">
            <span className="flex items-center gap-2 font-display text-[11px] font-bold tracking-wide text-amber-deep">
              <span className="h-[2px] w-4 bg-amber" /> HOW IT WORKS
            </span>
            <h2 className="font-serif text-3xl font-semibold text-ink-strong sm:text-4xl">
              Simple Steps to
              <br />
              Great Food
            </h2>
          </Reveal>

          <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-2">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className="flex flex-1 items-start gap-4 md:flex-col md:gap-0">
                  <div className="flex flex-col items-center gap-1 md:items-start">
                    <span className="font-display text-xs font-semibold text-hairline-strong">
                      {step.n}
                    </span>
                    <Reveal delay={i * 0.08}>
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-hairline-strong bg-white text-ink-strong">
                        <Icon className="h-6 w-6" />
                      </span>
                    </Reveal>
                  </div>
                  <div className="flex-1 pt-1 md:mt-5 md:pt-0">
                    <h3 className="font-display text-base font-bold text-ink-strong">
                      {step.title}
                    </h3>
                    <p className="mt-1 max-w-[210px] text-sm leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <ChevronIcon className="mt-6 hidden h-5 w-5 flex-none text-hairline-strong md:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QR concept */}
      <section id="how-qr-works" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal className="order-2 md:order-1">
            <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-[28px] border border-hairline-strong bg-ink-strong">
              <div
                className="h-48 w-48 rounded-2xl bg-cream sm:h-56 sm:w-56"
                style={{
                  backgroundImage:
                    "repeating-conic-gradient(#171717 0deg 8deg, #f8f5ee 8deg 16deg)",
                  backgroundSize: "22px 22px",
                }}
              />
              <span className="absolute bottom-6 rounded-full bg-white/10 px-3 py-1.5 font-display text-[11px] font-semibold text-white/80">
                dine3d.app/r/burger-lab
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 flex flex-col gap-5 md:order-2">
            <span className="font-display text-[11px] font-bold tracking-wide text-amber-deep">
              QR CODE CONCEPT
            </span>
            <h2 className="font-serif text-2xl font-semibold text-ink-strong sm:text-3xl">
              One scan opens the whole menu
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed text-muted">
              Every restaurant on Dine3D has a unique QR code that opens directly to its public menu
              — no app download, no sign-in.
            </p>
            <div className="flex flex-col gap-3">
              {["QR code", "Restaurant menu", "Categories", "Products", "Image, price & 3D model"].map(
                (label, i) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-navy-tint font-display text-[11px] font-bold text-navy-tint-text">
                      {i + 1}
                    </span>
                    <span className="font-display text-sm font-semibold text-ink-strong">
                      {label}
                    </span>
                  </div>
                )
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3D food experience */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#171717] px-6 py-10 sm:px-10 sm:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1fr_0.7fr]">
            <div className="flex flex-col gap-5">
              <span className="font-display text-[11px] font-bold tracking-wide text-amber-soft">
                3D FOOD EXPERIENCE
              </span>
              <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
                Experience Food in <span className="text-amber">3D</span>
              </h2>
              <p className="max-w-xs text-[15px] leading-relaxed text-white/60">
                Move, rotate, zoom and explore every detail of your favorite dishes.
              </p>
              <Link
                to="/restaurants"
                className="flex w-fit items-center gap-1.5 rounded-full bg-amber px-6 py-3.5 font-display text-sm font-bold text-white"
              >
                Explore Restaurants
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative mx-auto flex aspect-square w-full max-w-xs items-center justify-center">
              <div className="absolute inset-4 rounded-full border border-dashed border-amber/25" />
              <span className="absolute -top-1 right-6 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-display text-[11px] font-bold text-white backdrop-blur">
                360°
              </span>
              <span className="absolute left-0 top-1/3 -translate-x-1/2 -rotate-6 font-serif text-lg italic text-amber-soft sm:-left-6">
                Real Food
                <br />
                Real Experience
              </span>
              <img
                src={EXPERIENCE_IMAGE}
                alt="Plated dish in 3D preview"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://picsum.photos/seed/dine3d-3d/700/700";
                }}
                className="relative z-[1] h-[72%] w-[72%] rounded-full object-cover shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
              />
            </div>

            <div className="flex flex-row flex-wrap gap-3 lg:flex-col">
              {EXPERIENCE_ACTIONS.map(([Icon, label]) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/10 text-amber-soft">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-display text-sm font-semibold text-white">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* About/platform teaser */}
      <section className="mx-auto max-w-7xl px-5 py-16 text-center md:px-8 md:py-20">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4">
          <span className="font-display text-[11px] font-bold tracking-wide text-amber-deep">
            THE PLATFORM
          </span>
          <h2 className="font-serif text-2xl font-semibold text-ink-strong sm:text-3xl">
            Built for how people actually browse food today
          </h2>
          <p className="text-[15px] leading-relaxed text-muted">
            Dine3D is a discovery layer for restaurants — a fast, beautiful, no-login menu experience
            that works the moment a QR code is scanned.
          </p>
          <Link
            to="/about"
            className="mt-2 rounded-full border border-hairline-strong px-6 py-3.5 font-display text-sm font-bold text-ink-strong transition-colors hover:border-ink-strong"
          >
            Learn more about Dine3D
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
