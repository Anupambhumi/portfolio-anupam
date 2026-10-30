import { useState } from 'react';
import Layout from '@/components/Layout';
import { ProjectCard } from '@/components/ui';
import { CATEGORIES, getProjects } from '@/lib/content';

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('all');
  const filters = [['all', 'All'], ...Object.entries(CATEGORIES).filter(([key]) => projects.some((p) => p.category === key))];
  const shown = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <Layout title="Projects" description="Web, machine learning and Android projects by Anupam Kumar.">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Work</span>
          <h1>Projects</h1>
          <p className="lead">Things I&apos;ve built and shipped.</p>
          <div className="filters" role="group" aria-label="Filter projects">
            {filters.map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`filter cat-${key}${filter === key ? ' active' : ''}`}
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
              >
                {key !== 'all' && <span className="dot" aria-hidden="true" />}
                {label}
                <span className="count">{key === 'all' ? projects.length : projects.filter((p) => p.category === key).length}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="grid grid-3" key={filter}>
            {shown.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { projects: getProjects() } };
}
