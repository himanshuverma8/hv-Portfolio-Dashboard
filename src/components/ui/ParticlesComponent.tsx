import { Particles } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container } from "tsparticles-engine";

type ParticlesComponentProps = {
  id: string;
};

const ParticlesComponent: React.FC<ParticlesComponentProps> = ({ id }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const onParticlesLoaded = (container?: Container): void => {
    console.log("Particles Loaded:", container);
  };

  const options = useMemo(() => {
    return {
      background: {
        color: "#adacf8",
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          grab: {
            distance: 150,
            links: {
              opacity: 0.5,
            },
          },
        },
      },
      particles: {
        color: {
          value: "#FFFFFF",
        },
        links: {
          color: "#FFFFFF",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          outModes: {
            default: "bounce",
          },
          random: false,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 150,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    };
  }, []);

  return init ? <Particles id={id} options={options} onParticlesLoaded={onParticlesLoaded} /> : null;
};

export default ParticlesComponent;
