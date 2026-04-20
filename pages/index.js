import Head from 'next/head';
import Script from 'next/script';
import { loadLegacyBody } from '@/lib/legacy-page';

export default function Home({ bodyHtml }) {
  return (
    <>
      <Head>
        <meta name="keywords" content="Anupam Kumar, portfolio, Bhardwaj, Front end, personal portfolio lifecodes, portfolio design, portfolio website, personal portfolio" />
        <meta name="description" content="Welcome to Anupam's Portfolio. Data Scientist, Front end devloper, Android App Developer" />
        <title>Portfolio | Anupam</title>
        <link rel="shortcut icon" href="/assets/images/favicon.png" type="image/x-png" />
      </Head>

      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.5/typed.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/scrollreveal" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/emailjs-com/3.2.0/email.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/particles.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/app.js" strategy="afterInteractive" />
      <Script src="/assets/js/script.js" strategy="afterInteractive" />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      bodyHtml: await loadLegacyBody('index.html'),
    },
  };
}
