import { useCallback } from 'react';
import Particles from 'react-tsparticles';
// @ts-ignore
import { loadFull } from 'tsparticles';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <>
      {/* Fondo con gradiente animado */}
      <div 
        className="absolute inset-0 overflow-hidden gradient-animated"
        style={{
          background: `
            linear-gradient(45deg, 
              rgba(147, 197, 253, 0.15) 0%, 
              rgba(219, 234, 254, 0.1) 25%, 
              rgba(254, 242, 242, 0.08) 50%, 
              rgba(252, 231, 243, 0.12) 75%, 
              rgba(147, 197, 253, 0.15) 100%
            )
          `,
        }}
      />
      
      {/* Partículas */}
      <Particles
        id="tsparticles-bg"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { 
            color: 'transparent',
            opacity: 0
          },
          fpsLimit: 60,
          particles: {
            number: { value: 80, density: { enable: true, value_area: 1000 } },
            color: { 
              value: ['#93c5fd', '#dbeafe', '#fce7f3', '#fbcfe8'],
              animation: {
                enable: true,
                speed: 3,
                sync: false
              }
            },
            links: {
              enable: true,
              color: { value: '#93c5fd' },
              distance: 150,
              opacity: 0.3,
              width: 1
            },
            move: {
              enable: true,
              speed: 0.8,
              direction: 'none',
              random: true,
              straight: false,
              outModes: { default: 'bounce' },
              attract: { 
                enable: true,
                rotateX: 600,
                rotateY: 1200
              }
            },
            size: { 
              value: { min: 2, max: 8 },
              animation: {
                enable: true,
                speed: 2,
                sync: false
              }
            },
            opacity: { 
              value: { min: 0.2, max: 0.6 },
              animation: {
                enable: true,
                speed: 1.5,
                sync: false
              }
            },
            shape: { 
              type: 'circle',
              options: {
                circle: {
                  radius: 2
                }
              }
            },
          },
          interactivity: {
            detectsOn: 'canvas',
            events: {
              onHover: {
                enable: true,
                mode: 'repulse'
              },
              onClick: {
                enable: true,
                mode: 'push'
              }
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              }
            }
          },
          detectRetina: true,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      
    </>
  );
};

export default ParticlesBackground;
