import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';
import FloatingParticles from '@/components/FloatingParticles';
import { ProjectCard, SectionHeading, Timeline, TypedText } from '@/components/ui';
import { getEducation, getExperience, getProfile, getProjects, getPublications, getSkills } from '@/lib/content';

export default function Home({ profile, experience, projects, skills, publications, education }) {
  return (
    <Layout>
      <section className="hero" id="home">
        <div className="hero-bg" aria-hidden="true">
          <span className="aurora" />
          <span className="orb orb-1" />
          <span className="orb orb-2" />
          <span className="orb orb-3" />
          <span className="orb orb-4" />
          <span className="hero-grid-lines" />
          <FloatingParticles />
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="status-dot" aria-hidden="true" /> {profile.title}
            </span>
            <h1>
              Hi, I&apos;m <span className="gradient-text">{profile.shortName}</span>.
            </h1>
            <p className="hero-sub">
              I work on <TypedText words={profile.roles} />
            </p>
            <div className="hero-cta">
              <Link href="/projects" className="btn btn-primary">
                View projects <i className="fas fa-arrow-right" aria-hidden="true" />
              </Link>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
                Resume <i className="fas fa-file-alt" aria-hidden="true" />
              </a>
            </div>
            <div className="socials">
              {profile.socials.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} className="icon-btn">
                  <i className={s.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container about-grid">
          <div className="about-photo reveal">
            <Image src={profile.photo} alt={profile.name} width={420} height={480} sizes="(max-width: 900px) 80vw, 400px" />
          </div>
          <div className="reveal">
            <span className="eyebrow">About me</span>
            <h2>Building useful software, from data to the UI.</h2>
            <p className="lead">{profile.summary}</p>
            <dl className="facts">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Currently</dt>
                <dd>
                  {experience[0].role} at {experience[0].company}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="experience">
        <div className="container">
          <SectionHeading eyebrow="Career" title="Experience" />
          <Timeline items={experience} />
          <div className="center reveal">
            <Link href="/experience" className="btn btn-ghost">
              Full experience <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="container">
          <SectionHeading eyebrow="Work" title="Selected projects">
            A few things I&apos;ve built across web, machine learning and Android.
          </SectionHeading>
          <div className="grid grid-3">
            {projects.slice(0, 3).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          <div className="center reveal">
            <Link href="/projects" className="btn btn-ghost">
              All projects <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="skills">
        <div className="container">
          <SectionHeading eyebrow="Toolbox" title="Skills" />
          <ul className="skills-grid">
            {skills.map((s) => (
              <li key={s.name} className="card skill reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.icon} alt="" width={36} height={36} loading="lazy" className={s.invertDark ? 'invert-dark' : ''} />
                <span>{s.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="publications">
        <div className="container">
          <SectionHeading eyebrow="Research" title="Publications" />
          <div className="grid grid-2">
            {publications.map((p) => (
              <a key={p.url} href={p.url} target="_blank" rel="noreferrer" className="card pub-card reveal">
                <span className="chip chip-accent">{p.venue}</span>
                <h3>{p.title}</h3>
                <p className="muted small">
                  Published {p.displayDate} <i className="fas fa-external-link-alt" aria-hidden="true" />
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="education">
        <div className="container">
          <SectionHeading eyebrow="Learning" title="Education" />
          <div className="grid grid-3">
            {education.map((e) => (
              <article key={e.school} className="card edu-card reveal">
                <div className="edu-media">
                  <Image src={e.image} alt={e.school} fill sizes="(max-width: 700px) 100vw, 360px" />
                </div>
                <div className="edu-body">
                  <h3>{e.degree}</h3>
                  <p>
                    {e.school} · {e.board}
                  </p>
                  <p className="muted small">{e.period}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container contact-grid">
          <div className="reveal">
            <span className="eyebrow">Contact</span>
            <h2>Let&apos;s work together.</h2>
            <p className="lead">
              Have a role, a project or a question? Send a message and it lands straight in my inbox.
            </p>
            <ul className="contact-list">
              <li>
                <i className="fas fa-envelope" aria-hidden="true" /> <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <i className="fas fa-map-marker-alt" aria-hidden="true" /> {profile.location}
              </li>
              <li>
                <i className="fas fa-comments" aria-hidden="true" /> Or ask the chat assistant in the corner
              </li>
            </ul>
          </div>
          <div className="reveal">
            <ContactForm email={profile.email} />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      profile: getProfile(),
      experience: getExperience(),
      projects: getProjects(),
      skills: getSkills(),
      publications: getPublications(),
      education: getEducation(),
    },
    // Rebuild hourly so "Present" durations stay current without a redeploy.
    revalidate: 3600,
  };
}
