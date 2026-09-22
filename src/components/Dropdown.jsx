import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronIcon, MapPinIcon } from "./Icons";

export default function Dropdown({ value, options, onChange, className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center gap-2 rounded-full border bg-white px-5 py-3.5 text-left font-display text-sm font-semibold text-ink transition-colors ${
          open ? "border-amber" : "border-hairline-strong hover:border-ink-strong"
        }`}
      >
        <MapPinIcon className="h-4 w-4 flex-none text-amber" />
        <span className="flex-1 truncate">{value}</span>
        <ChevronIcon className={`h-4 w-4 flex-none rotate-90 text-muted transition-transform ${open ? "-rotate-90" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-72 overflow-auto rounded-2xl border border-hairline bg-white p-1.5 shadow-[0_24px_48px_-20px_rgba(23,23,23,0.25)]"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`block w-full rounded-xl px-3.5 py-2.5 text-left font-display text-sm font-semibold transition-colors ${
                  opt === value ? "bg-amber text-white" : "text-ink-strong hover:bg-chip"
                }`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
