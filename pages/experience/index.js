import Link from 'next/link';
import Layout from '@/components/Layout';
import { SectionHeading, Timeline } from '@/components/ui';
import { getExperience, getPublications } from '@/lib/content';

export default function Experience({ experience, publications }) {
  return (
    <Layout title="Experience" description="Work experience and publications of Anupam Kumar.">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Career</span>
          <h1>Experience</h1>
          <p className="lead">Where I&apos;ve worked and what I&apos;ve published.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Timeline items={experience} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading eyebrow="Research" title="Publications" />
          <div className="grid grid-2">
            {publications.map((p) => (
              <a key={p.url} href={p.url} target="_blank" rel="noreferrer" className="card pub-card reveal">
                <span className="chip chip-accent">{p.venue}</span>
                <h3>{p.title}</h3>
                <p className="muted small">Published {p.displayDate}</p>
              </a>
            ))}
          </div>
          <div className="center reveal">
            <Link href="/#contact" className="btn btn-primary">
              Get in touch <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: { experience: getExperience(), publications: getPublications() },
    revalidate: 3600,
  };
}
