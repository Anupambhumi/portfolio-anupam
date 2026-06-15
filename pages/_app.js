import '@/styles/globals.css';
import Script from 'next/script';

const chatbotScriptUrl = 'https://chatbot.aicte-india.org/embed.js?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImRldi1hZG1pbi0wMDEiLCJkb2NfaWQiOiIyOGJmMjYyZS1jNjIyLTRkYzEtYjYzYy01YTlhMDgyYTRmODIiLCJkb21haW4iOiIyOGJmMjYyZS1jNjIyLTRkYzEtYjYzYy01YTlhMDgyYTRmODIiLCJwbGFuIjoic3RhbmRhcmQiLCJpYXQiOjE3ODE0ODIwOTgsImV4cCI6MTgxMzAxODA5OH0.oruO_IObiWq-fYJ_CvmYU92CLie1i54Pqthy4ZVcRcY';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script src={chatbotScriptUrl} strategy="afterInteractive" />
    </>
  );
}
