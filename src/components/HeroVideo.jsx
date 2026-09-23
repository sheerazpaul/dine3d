import { useRef, useState } from "react";
import { useMotionValueEvent, useSpring } from "framer-motion";
import burgerOrbit from "../assets/hero-video/burger-orbit.mp4";

// Real video background for the hero. Instead of letting it autoplay on a
// timer, its currentTime is driven directly by scroll progress through the
// section (smoothed with a spring) — scrolling down scrubs forward through
// the shot, scrolling back up reverses it, same behavior as the earlier
// image-sequence version but now backed by an actual video file.
export default function HeroVideo({ scrollYProgress, className = "" }) {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.6 });

  useMotionValueEvent(smooth, "change", (v) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    video.currentTime = Math.min(duration, Math.max(0, v * duration));
  });

  return (
    <div className={`absolute inset-0 overflow-hidden bg-[#0e0d0c] ${className}`}>
      <video
        ref={videoRef}
        src={burgerOrbit}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  );
}
