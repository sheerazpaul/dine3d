import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import ModelErrorBoundary from "./ModelErrorBoundary";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-cream-soft">
      <div className="flex flex-col items-center gap-3">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-hairline-strong border-t-amber" />
        <span className="font-display text-xs font-semibold text-muted">Loading 3D model…</span>
      </div>
    </div>
  );
}

function ViewerUnavailable() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-cream-soft text-center">
      <span className="text-2xl">◎</span>
      <span className="max-w-[220px] font-display text-xs font-semibold text-muted">
        3D preview isn't available in this browser right now — try again on a device with graphics
        acceleration.
      </span>
    </div>
  );
}

function useArSupport() {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      if (typeof navigator === "undefined") return;
      if (navigator.xr?.isSessionSupported) {
        try {
          const ok = await navigator.xr.isSessionSupported("immersive-ar");
          if (!cancelled) setSupported(!!ok);
          return;
        } catch {
          /* fall through */
        }
      }
      const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
      if (!cancelled) setSupported(isIOS);
    };
    check();
    return () => {
      cancelled = true;
    };
  }, []);

  return supported;
}

export default function ModelViewer({ modelUrl, productName }) {
  const containerRef = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const arSupported = useArSupport();

  if (!modelUrl) return null;

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      await el.requestFullscreen?.();
      setFullscreen(true);
    } else {
      await document.exitFullscreen?.();
      setFullscreen(false);
    }
  };

  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-bold text-ink-strong">
          Interactive 3D Model
        </span>
        <div className="flex items-center gap-2">
          {arSupported && !contextLost && (
            <button
              type="button"
              className="rounded-full border border-hairline-strong px-3.5 py-1.5 font-display text-xs font-bold text-ink-strong transition-colors hover:border-ink-strong"
            >
              ↗ View in AR
            </button>
          )}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline-strong text-ink-strong transition-colors hover:border-ink-strong"
            aria-label="Toggle fullscreen"
          >
            {fullscreen ? "⤡" : "⤢"}
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-80 w-full overflow-hidden rounded-2xl border border-hairline bg-cream-soft sm:h-96"
      >
        {contextLost ? (
          <ViewerUnavailable />
        ) : (
          <ModelErrorBoundary fallback={<ViewerUnavailable />}>
            <Suspense fallback={<Loader />}>
              <Canvas
                camera={{ position: [0, 0.4, 3.2], fov: 40 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, powerPreference: "default", failIfMajorPerformanceCaveat: false }}
                onCreated={({ gl }) => {
                  gl.domElement.addEventListener("webglcontextlost", (e) => {
                    e.preventDefault();
                    setContextLost(true);
                  });
                }}
              >
                <ambientLight intensity={0.7} />
                <directionalLight position={[3, 5, 2]} intensity={1.3} />
                <directionalLight position={[-3, -2, -2]} intensity={0.4} />
                <Model url={modelUrl} />
                <OrbitControls
                  makeDefault
                  enablePan={false}
                  enableZoom
                  minDistance={1.5}
                  maxDistance={8}
                  autoRotate
                  autoRotateSpeed={1.2}
                />
              </Canvas>
            </Suspense>
          </ModelErrorBoundary>
        )}
        {!contextLost && (
          <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/35 px-3 py-1 font-display text-[10px] font-semibold text-white backdrop-blur">
            Drag to rotate · Scroll to zoom
          </span>
        )}
      </div>
      <p className="text-xs text-muted">
        Exploring {productName} in 3D — this is a placeholder model for demonstration.
      </p>
    </div>
  );
}
