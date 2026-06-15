import '@/styles/globals.css';
import Script from 'next/script';
import { useEffect, useState } from 'react';

const chatbotTokensByHostname = {
  'anupambhumi.in': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImRldi1hZG1pbi0wMDEiLCJkb2NfaWQiOiJhbnVwYW1iaHVtaS5pbiIsImRvbWFpbiI6ImFudXBhbWJodW1pLmluIiwicGxhbiI6InN0YW5kYXJkIiwiaWF0IjoxNzc4MDM4Nzg0LCJleHAiOjE4MDk1NzQ3ODR9.lqIrLaoXgsCUJa56GeCVo-oJDOxP0Y8elwozmBNZolo',
  'www.anupambhumi.in': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImRldi1hZG1pbi0wMDEiLCJkb2NfaWQiOiJhbnVwYW1iaHVtaS5pbiIsImRvbWFpbiI6ImFudXBhbWJodW1pLmluIiwicGxhbiI6InN0YW5kYXJkIiwiaWF0IjoxNzc4MDM4Nzg0LCJleHAiOjE4MDk1NzQ3ODR9.lqIrLaoXgsCUJa56GeCVo-oJDOxP0Y8elwozmBNZolo',
  'anupambhumiportfolio.netlify.app': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImRldi1hZG1pbi0wMDEiLCJkb2NfaWQiOiJhbnVwYW1iaHVtaXBvcnRmb2xpby5uZXRsaWZ5LmFwcCIsImRvbWFpbiI6ImFudXBhbWJodW1pcG9ydGZvbGlvLm5ldGxpZnkuYXBwIiwicGxhbiI6InN0YW5kYXJkIiwiaWF0IjoxNzc2NzUzMDE5LCJleHAiOjE4MDgyODkwMTl9.9qcmXDMHx_FoLoYhLH_4N_e4z62syPCgpiOEwQZQaz4',
};

export default function App({ Component, pageProps }) {
  const [chatbotScriptUrl, setChatbotScriptUrl] = useState('');

  useEffect(() => {
    const token = chatbotTokensByHostname[window.location.hostname];

    if (token) {
      setChatbotScriptUrl(`https://chatbot.aicte-india.org/embed.js?token=${token}`);
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      {chatbotScriptUrl && <Script src={chatbotScriptUrl} strategy="afterInteractive" />}
    </>
  );
}
