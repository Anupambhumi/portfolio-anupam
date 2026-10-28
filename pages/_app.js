import '@/styles/globals.css';
import Script from 'next/script';

const CHATBOT_SRC =
  'https://chatbot-backend.aicte-india.org/embed.js?token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJhbnVwYW1iaHVtaXBvcnRmb2xpby5uZXRsaWZ5LmFwcCIsInBsYW4iOiJzdGFuZGFyZCIsInB1cnBvc2UiOiJjaGF0Ym90X2VtYmVkIiwiaWF0IjoxNzkzMTc3NDk5LCJleHAiOjE3OTU3Njk0OTl9.c2_7zvTO2OmAvIRdVKAK5IzDfvKKnUFncAvDJKgCDi1uKiUdiu1ZW4G3haFl9dujTB2S0N9mcdP4ZT22ncVafg';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script src={CHATBOT_SRC} strategy="afterInteractive" />
    </>
  );
}
