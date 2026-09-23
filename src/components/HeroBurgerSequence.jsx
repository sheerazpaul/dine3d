import { motion, useSpring, useTransform } from "framer-motion";

// 20 cinematic burger-assembly stills. Scroll through the hero and this
// scrubs forward/backward through them like a video timeline — no timers,
// no jump-cuts, just scroll position driving frame opacity directly. Each
// frame also gets a subtle Ken Burns zoom/drift as it enters and exits, so
// the crossfade reads as camera movement rather than a flat dissolve. The
// final frame (the hero shot) settles into a slow, continuous float + turn
// once it's fully in view, like a resting product shot.
const FRAME_MODULES = import.meta.glob("../assets/hero-sequence/scene-*.png", {
  eager: true,
  import: "default",
});
const FRAMES = Object.keys(FRAME_MODULES)
  .sort()
  .map((key) => FRAME_MODULES[key]);

function Frame({ src, index, total, progress, isLast }) {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  const before = Math.max(0, start - step);
  const after = Math.min(1, end + step);

  const opacity = useTransform(
    progress,
    [before, start, isLast ? 1 : end, after],
    isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );
  // Gentle Ken Burns: each frame drifts in slightly larger/offset, settles,
  // then drifts back out — a cheap stand-in for real camera movement.
  const scale = useTransform(progress, [before, start, end, after], [1.06, 1.01, 1.01, 1.06]);
  const y = useTransform(progress, [before, start, end, after], [14, 0, 0, -14]);

  return (
    <motion.img
      src={src}
      alt=""
      style={{ opacity, scale, y }}
      className="absolute inset-0 h-full w-full object-cover object-center"
      draggable={false}
    />
  );
}

export default function HeroBurgerSequence({ scrollYProgress, className = "" }) {
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.6 });

  return (
    <div className={`absolute inset-0 overflow-hidden bg-[#0e0d0c] ${className}`}>
      {/* Preload every frame so scrubbing never reveals a blank image */}
      <div className="hidden">
        {FRAMES.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>

      {FRAMES.map((src, i) => (
        <Frame
          key={src}
          src={src}
          index={i}
          total={FRAMES.length}
          progress={smooth}
          isLast={i === FRAMES.length - 1}
        />
      ))}

      {/* Resting hero shot: once the sequence settles on the final frame,
          give it a slow continuous float + rotation so it never feels static. */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ opacity: useTransform(smooth, [1 - 1 / FRAMES.length, 1], [0, 1]) }}
      >
        <motion.img
          src={FRAMES[FRAMES.length - 1]}
          alt=""
          animate={{ y: [0, -10, 0], rotate: [0, 1.2, 0, -1.2, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover object-center"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
