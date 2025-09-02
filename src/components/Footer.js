// ---------- imports ----------
import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

import WhatsAppLogo  from '../assets/whatsapp-logo.png';
import GmailLogo     from '../assets/gmail-logo.png';
import InstagramLogo from '../assets/instagram-logo.png';
import YouTubeLogo   from '../assets/youtube-logo.png';
import FacebookLogo  from '../assets/facebook-logo.png';
import TwitterLogo   from '../assets/twitter-logo.png';

// ---------- constants ----------
const FOUNDER_DETAILS_URL = 'https://www.xfactorial.online/Other-files/founder.html';
const TERMS_PAGE_URL      = 'https://www.xfactorial.online/Other-files/terms.html';
const TYPEWRITER_TEXT     = 'REDEFINE LEARNING. BREAK THE TRADITIONAL.';

// ---------- motion variants ----------
const fadeSlide = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// ---------- Typewriter component ----------
const Typewriter = () => {
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const fullText = TYPEWRITER_TEXT;
    let timer;

    // If we’re in the pause phase, wait 7.5s then resume typing
    if (pause) {
      timer = setTimeout(() => {
        setPause(false);
        setDeleting(false);    // start typing again
      }, 7500);
      return () => clearTimeout(timer);
    }

    // Typing phase
    if (!deleting) {
      if (display.length < fullText.length) {
        timer = setTimeout(
          () => setDisplay(fullText.slice(0, display.length + 1)),
          120
        );
      } else {
        // immediately switch to deleting once fully typed
        setDeleting(true);
      }
    }
    // Deleting phase
    else {
      if (display.length > 0) {
        timer = setTimeout(
          () => setDisplay(fullText.slice(0, display.length - 1)),
          80
        );
      } else {
        // once fully deleted, enter one big pause
        setPause(true);
      }
    }

    return () => clearTimeout(timer);
  }, [display, deleting, pause]);

  return (
    <div className="typewriter-text">
      {display}
      <span className="cursor">|</span>
    </div>
  );
};

// ---------- Footer Component ----------
const Footer = () => {
  /* CTA handlers */
  const handleWhatsAppClick = () =>
    window.open('https://wa.me/917866049865', '_blank');

  const handleEmailClick = () =>
    window.open(
      'https://mail.google.com/mail/?view=cm&fs=1&to=asversity.helpdesk@gmail.com',
      '_blank'
    );

  return (
    <>
      <motion.div
        className="contact-container"
        variants={fadeSlide}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* ---- Contact Us + Follow Us together ---- */}
        <div className="contact-follow-wrapper">
          {/* Contact */}
          <div className="contact-section">
            <h2>Contact Us</h2>
            <div className="button-container">
              <motion.button
                whileHover={{ y: -6, filter: 'brightness(1.2)' }}
                whileTap={{ scale: 0.96 }}
                onClick={handleWhatsAppClick}
                className="contact-whatsapp-button"
              >
                <img src={WhatsAppLogo} alt="WhatsApp" className="button-icon" />
              </motion.button>
              <motion.button
                whileHover={{ y: -6, filter: 'brightness(1.2)' }}
                whileTap={{ scale: 0.96 }}
                onClick={handleEmailClick}
                className="contact-email-button"
              >
                <img src={GmailLogo} alt="Gmail" className="button-icon" />
              </motion.button>
            </div>
          </div>

          {/* Follow Us */}
          <div className="follow-us-section">
            <h3 className="follow-us-heading">Follow Us</h3>
            <div className="social-icons">
              {[
                { href: 'https://www.instagram.com/xfactorial.in?utm_source=qr&igsh=bXNiNGFjcXFwcnVq', img: InstagramLogo, alt: 'Instagram' },
                { href: 'https://youtube.com/@asversity_technologies?si=VM-w53FEMc9aeyiS', img: YouTubeLogo,   alt: 'YouTube'    },
                { href: 'https://www.facebook.com/asversityfacebook...', img: FacebookLogo,  alt: 'Facebook'   },
                { href: 'https://x.com/comeonsom_?t=GCaq6uE0FodJOuC8854iEg&s=09',                  img: TwitterLogo,   alt: 'Twitter/X'  },
              ].map(({ href, img, alt }) => (
                <motion.a
                  key={alt}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -6, filter: 'brightness(1.2)' }}
                >
                  <img src={img} alt={alt} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Typewriter filler */}
          <div className="typewriter-wrapper">
            <Typewriter />
          </div>
        </div>
      </motion.div>

      {/* ---- Footer strip ---- */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} ULVOXO VERSITY. All rights reserved.</p>
        <p>
          <motion.span
            className="clickable-text"
            onClick={() => window.open(FOUNDER_DETAILS_URL, '_blank')}
            whileHover={{ textShadow: '0px 0px 8px var(--highlight-color)', scale: 1.04 }}
          >
            Founder Details
          </motion.span>
          {' | '}
          <motion.span
            className="clickable-text"
            onClick={() => window.open(TERMS_PAGE_URL, '_blank')}
            whileHover={{ textShadow: '0px 0px 8px var(--highlight-color)', scale: 1.04 }}
          >
            Terms of Service
          </motion.span>
        </p>
      </footer>
    </>
  );
};

export default Footer;
