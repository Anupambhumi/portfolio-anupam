import Head from 'next/head';
import Script from 'next/script';
import { loadLegacyBody } from '@/lib/legacy-page';

export default function Projects({ bodyHtml }) {
  return (
    <>
      <Head>
        <title>Projects | Portfolio Anupam</title>
        <link rel="shortcut icon" href="/assets/images/favicon.png" type="image/x-png" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/scrollreveal" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.6/isotope.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/projects/script.js" strategy="afterInteractive" />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      bodyHtml: await loadLegacyBody('projects/index.html'),
    },
  };
}
