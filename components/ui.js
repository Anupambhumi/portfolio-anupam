import { useEffect, useState } from 'react';
import Image from 'next/image';

export function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading reveal">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {children && <p className="muted">{children}</p>}
    </div>
  );
}

// Cycles through words with a typing effect; falls back to the first word
// for reduced-motion users.
export function TypedText({ words }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let word = 0;
    let len = words[0].length;
    let deleting = true;
    let timer;
    const tick = () => {
      const current = words[word];
      len += deleting ? -1 : 1;
      setText(current.slice(0, len));
      let delay = deleting ? 40 : 80;
      if (!deleting && len === current.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && len === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        delay = 300;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 1600);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span className="typed" aria-live="off">
      {text}
      <span className="caret" aria-hidden="true" />
    </span>
  );
}

export function ProjectCard({ project }) {
  return (
    <article className={`card project-card reveal cat-${project.category}`}>
      <div className="project-media">
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 360px"
        />
        <span className="chip chip-floating chip-cat">{project.categoryLabel}</span>
      </div>
      <div className="project-body">
        <h3>{project.name}</h3>
        <p className="muted">{project.description}</p>
        <div className="project-links">
          {project.links.view && (
            <a href={project.links.view} target="_blank" rel="noreferrer" className="link-btn">
              <i className="fas fa-external-link-alt" aria-hidden="true" /> View
            </a>
          )}
          {project.links.code && (
            <a href={project.links.code} target="_blank" rel="noreferrer" className="link-btn">
              <i className="fab fa-github" aria-hidden="true" /> Code
            </a>
          )}
          {!project.links.view && !project.links.code && <span className="muted small">Private project</span>}
        </div>
      </div>
    </article>
  );
}

export function Timeline({ items }) {
  return (
    <ol className="timeline">
      {items.map((job) => (
        <li key={`${job.company}-${job.start}`} className="timeline-item reveal">
          <span className="timeline-dot" aria-hidden="true" />
          <div className="card timeline-card">
            <div className="timeline-logo">
              <Image src={job.logo} alt="" width={56} height={56} />
            </div>
            <div>
              <div className="timeline-top">
                <h3>{job.role}</h3>
                {job.current && <span className="chip chip-accent">Current</span>}
              </div>
              <p className="timeline-company">
                {job.company} · {job.type}
              </p>
              <p className="muted small">
                <i className="far fa-calendar-alt" aria-hidden="true" /> {job.period} · {job.duration}
              </p>
              <p className="muted small">
                <i className="fas fa-map-marker-alt" aria-hidden="true" /> {job.location}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
