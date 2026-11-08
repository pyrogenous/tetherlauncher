import { useEffect, useRef } from "react";
import "./App.css";
import { getCurrentWindow } from "@tauri-apps/api/window";

export function useNativeTitleFps() {
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const appWindow = getCurrentWindow();

    const loop = (now: number) => {
      frameCount.current++;
      const delta = now - lastTime.current;

      if (delta >= 500) {
        const fps = Math.round((frameCount.current / delta) * 1000);
        appWindow.setTitle(`Tether Launcher | DEVELOPMENT - FPS: ${fps}`);
        frameCount.current = 0;
        lastTime.current = now;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);
}

function App() {
  useNativeTitleFps();

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

    </main>
  );
}

export default App;
