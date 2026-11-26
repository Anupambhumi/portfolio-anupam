import Link from 'next/link';
import Layout from '@/components/Layout';

export default function NotFound() {
  return (
    <Layout title="Page not found">
      <section className="not-found">
        <div className="container">
          <p className="nf-code gradient-text" aria-hidden="true">
            404
          </p>
          <h1>Looks like you&apos;re lost.</h1>
          <p className="lead">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
          <div className="hero-cta center-row">
            <Link href="/" className="btn btn-primary">
              <i className="fas fa-home" aria-hidden="true" /> Back to home
            </Link>
            <Link href="/projects" className="btn btn-ghost">
              See projects
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
