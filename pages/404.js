import Head from 'next/head';
import Script from 'next/script';
import { loadLegacyBody } from '@/lib/legacy-page';

export default function Custom404({ bodyHtml }) {
  return (
    <>
      <Head>
        <title>Got Lost! Page Not Found</title>
        <link rel="shortcut icon" href="/assets/images/favicon.png" type="image/x-png" />
        <link rel="stylesheet" href="/assets/css/404.css" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/404.js" strategy="afterInteractive" />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      bodyHtml: await loadLegacyBody('404.html'),
    },
  };
}
