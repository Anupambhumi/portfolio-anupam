// CSS-only particle field for the hero: glowing dots and rings that float up
// and twinkle. Values come from a seeded generator so server and client
// render the same markup (no hydration mismatch), and every particle animates
// only transform/opacity, which the browser runs off the main thread.
const COUNT = 46;
const COLORS = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)', 'var(--accent-4)'];

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seeded(42);
const PARTICLES = Array.from({ length: COUNT }, (_, i) => {
  const ring = i % 7 === 0;
  return {
    ring,
    style: {
      left: `${(rand() * 100).toFixed(2)}%`,
      top: `${(20 + rand() * 85).toFixed(2)}%`,
      '--size': `${ring ? 14 + rand() * 16 : 4 + rand() * 6}px`,
      '--dx': `${((rand() - 0.5) * 120).toFixed(0)}px`,
      '--rise': `${(25 + rand() * 45).toFixed(0)}vh`,
      '--dur': `${(9 + rand() * 12).toFixed(1)}s`,
      '--delay': `${(-rand() * 20).toFixed(1)}s`,
      '--color': COLORS[Math.floor(rand() * COLORS.length)],
    },
  };
});

export default function FloatingParticles() {
  return (
    <div className="particles" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span key={i} className={p.ring ? 'particle ring' : 'particle'} style={p.style} />
      ))}
    </div>
  );
}
