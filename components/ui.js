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

export function ProjectCard({ project, reveal = true }) {
  const [activeTab, setActiveTab] = useState(0);
  const [archOpen, setArchOpen] = useState(false);

  const demo = project.demo || {};
  const tabs =
    Array.isArray(demo.tabs) && demo.tabs.length > 0
      ? demo.tabs
      : [
          {
            label: 'Overview',
            badge: project.links?.view ? 'LIVE PROJECT' : 'PROJECT PREVIEW',
            title: project.name,
            description: project.description,
            tags: (project.stack || []).slice(0, 3),
          },
        ];
  const currentTab = tabs[activeTab] || tabs[0];

  return (
    <article className={`project-showcase${reveal ? ' reveal' : ''} cat-${project.category}`}>
      <div className="ps-left">
        <div className="ps-meta">
          <span>{project.showcaseCategory || project.categoryLabel}</span>
          {project.orgLabel && <span>{project.orgLabel}</span>}
        </div>
        <h3 className="ps-title">{project.name}</h3>
        <p className="ps-lead">{project.description}</p>

        {project.problem && (
          <div className="ps-block">
            <span className="ps-label">THE PROBLEM</span>
            <p className="ps-text">{project.problem}</p>
          </div>
        )}

        {project.audience && (
          <div className="ps-block">
            <span className="ps-label">WHO USES IT</span>
            <p className="ps-text">{project.audience}</p>
          </div>
        )}

        {project.impact?.length > 0 && (
          <div className="ps-block">
            <span className="ps-label">RESULT &amp; IMPACT</span>
            <ul className="ps-impact">
              {project.impact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {(project.stack?.length > 0 || project.architecture) && (
          <div className={`ps-accordion${archOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="ps-accordion-btn"
              aria-expanded={archOpen}
              onClick={() => setArchOpen((v) => !v)}
            >
              <span className="ps-accordion-btn-left">
                <span>
                  &lt;/&gt; <strong>For developers</strong>
                </span>
                <span className="ps-accordion-sub">· STACK &amp; ARCHITECTURE</span>
              </span>
              <i className="fas fa-chevron-down ps-accordion-icon" aria-hidden="true" />
            </button>
            {archOpen && (
              <div className="ps-accordion-body">
                {project.architecture && <p className="ps-arch-text">{project.architecture}</p>}
                {project.stack?.length > 0 && (
                  <div className="ps-stack-list">
                    {project.stack.map((tech) => (
                      <span key={tech} className="ps-stack-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="ps-actions">
          {project.links?.view && (
            <a href={project.links.view} target="_blank" rel="noreferrer" className="ps-btn-primary">
              {project.visitLabel || 'Visit Project'} <span aria-hidden="true">&#8599;</span>
            </a>
          )}
          {project.links?.code && project.links.code !== project.links.view && (
            <a href={project.links.code} target="_blank" rel="noreferrer" className="ps-btn-secondary">
              <i className="fab fa-github" aria-hidden="true" /> Code
            </a>
          )}
          {!project.links?.view && !project.links?.code && <span className="muted small">Private project</span>}
        </div>
      </div>

      <div className="ps-right">
        <div className="ps-demo-top">
          <span className="ps-demo-id">{project.codeId || `P.0${project.id}`} · INTERACTIVE DEMO</span>
          <span className="ps-live-badge">
            <span className="ps-live-dot" aria-hidden="true" /> {demo.footerRight || 'Live'}
          </span>
        </div>

        <div className="ps-demo-frame">
          <div className="ps-demo-header">
            <span className="ps-demo-header-title">{demo.headerTitle || project.name}</span>
            <div className="ps-demo-tabs" role="tablist" aria-label={`${project.name} views`}>
              {tabs.map((tab, idx) => (
                <button
                  key={tab.label}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === idx}
                  className={`ps-demo-tab${activeTab === idx ? ' is-active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="ps-demo-body">
            <div className="ps-demo-card">
              <div className="ps-demo-badge">{currentTab.badge}</div>
              <h4 className="ps-demo-card-title">{currentTab.title}</h4>
              <p className="ps-demo-card-desc">{currentTab.description}</p>
              {currentTab.tags?.length > 0 && (
                <div className="ps-demo-tags">
                  {currentTab.tags.map((tag) => (
                    <span key={tag} className="ps-demo-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="ps-demo-footer">
            <span>{demo.footerLeft || project.name}</span>
            <span className="ps-demo-footer-status">
              <span className="ps-live-dot" aria-hidden="true" /> {demo.footerRight || 'Live'}
            </span>
          </div>
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
