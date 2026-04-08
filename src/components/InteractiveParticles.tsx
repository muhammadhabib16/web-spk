"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function InteractiveParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab", // Garis akan menyambung ke mouse
          },
        },
        modes: {
          grab: {
            distance: 200,
            links: { opacity: 0.5 },
          },
        },
      },
      particles: {
        color: { value: "#3b82f6" }, // Warna Biru
        links: {
          color: "#3b82f6",
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: false,
          straight: false,
          outModes: "out",
        },
        number: {
          density: { enable: true, area: 800 },
          value: 100, // Kepadatan partikel
        },
        opacity: { value: 0.4 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    [],
  );

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options as any}
      className="absolute inset-0 z-0"
    />
  );
}
