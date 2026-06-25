import Head from 'next/head';
import Script from 'next/script';

export default function Experience() {
  const preventContextMenu = (event) => {
    event.preventDefault();
  };

  return (
    <div onContextMenu={preventContextMenu}>
      <Head>
        <title>Experience | Portfolio Anupam</title>
        <link rel="shortcut icon" href="/assets/images/favicon.png" type="image/x-png" />
        <link rel="stylesheet" href="/experience/style.css" />
      </Head>
      <header>
        <a href="/" className="logo"><i className="fab fa-node-js"></i> Anupam</a>

        <div id="menu" className="fas fa-bars"></div>
        <nav className="navbar">
          <ul>
            <li><a href="/#home">Home</a></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#skills">Skills</a></li>
            <li><a href="/#education">Education</a></li>
            <li><a href="#work">Projects</a></li>
            <li><a href="#Publications">Publications</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="footer">
        <div className="box-container">
          <div className="box">
            <h3>Anupam&apos;s Portfolio</h3>
            <p>Thank you for visiting my personal portfolio website. Connect with me over socials. <br /> <br /> Keep Rising. Connect with me over live chat!</p>
          </div>

          <div className="box">
            <h3>quick links</h3>
            <a href="/#home"><i className="fas fa-chevron-circle-right"></i> home</a>
            <a href="/#about"><i className="fas fa-chevron-circle-right"></i> about</a>
            <a href="/#skills"><i className="fas fa-chevron-circle-right"></i> skills</a>
            <a href="/#education"><i className="fas fa-chevron-circle-right"></i> education</a>
            <a href="/#projects"><i className="fas fa-chevron-circle-right"></i> projects</a>
            <a href="/#publication"><i className="fas fa-chevron-circle-right"></i> publication</a>
          </div>

          <div className="box">
            <h3>contact info</h3>
            <p> <i className="fas fa-phone"></i>+91 **********</p>
            <p> <i className="fas fa-envelope"></i>anupambhumi@gmail.com</p>
            <p> <i className="fas fa-map-marked-alt"></i>Bihar, India</p>
            <div className="share">
              <a href="https://www.linkedin.com/in/anupam-kumar-a8645a22a/" className="fab fa-linkedin" target="_blank" rel="noreferrer"></a>
              <a href="https://github.com/Anupambhumi" className="fab fa-github" target="_blank" rel="noreferrer"></a>
              <a href="mailto:anupambhumi@gmail.com" className="fas fa-envelope" target="_blank" rel="noreferrer"></a>
              <a href="" className="fab fa-twitter" target="_blank" rel="noreferrer"></a>
              <a href="" className="fab fa-telegram-plane" target="_blank" rel="noreferrer"></a>
            </div>
          </div>
        </div>

        <h1 className="credit">Designed with <i className="fa fa-heart pulse"></i> by <a href="https://www.linkedin.com/in/anupam-kumar-a8645a22a/"> Anupam</a></h1>
      </section>

      <a href="#experience" className="fas fa-angle-up" id="scroll-top"></a>

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" strategy="beforeInteractive" />
      <Script src="https://unpkg.com/scrollreveal" strategy="afterInteractive" />
      <Script src="/experience/script.js" strategy="afterInteractive" />
    </div>
  );
}
