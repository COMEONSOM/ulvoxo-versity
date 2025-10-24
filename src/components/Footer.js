// ============================================================
// 🧩 FOOTER COMPONENT — SYNCED WITH LATEST VERSION 1.1.4
// ------------------------------------------------------------
// AUTHOR: TEAM OPENROOT
// DATE: OCTOBER 2025
// ============================================================

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

// ---------- IMPORTED ICONS ----------
import WhatsAppLogo from '../assets/whatsapp-logo.png';
import GmailLogo from '../assets/gmail-logo.png';
import InstagramLogo from '../assets/instagram-logo.png';
import YouTubeLogo from '../assets/youtube-logo.png';
import FacebookLogo from '../assets/facebook-logo.png';
import TwitterLogo from '../assets/twitter-logo.png';

// ---------- CONSTANT LINKS ----------
const FOUNDER_DETAILS_URL = 'https://www.xfactorial.online/Other-files/founder.html';
const TERMS_PAGE_URL = 'https://www.xfactorial.online/Other-files/terms.html';
const TYPEWRITER_TEXT = 'REDEFINE LEARNING.';

// ============================================================
// TYPEWRITER COMPONENT — HANDLES TEXT ANIMATION SAFELY
// ============================================================
const Typewriter = () => {
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const fullText = TYPEWRITER_TEXT;
    let timer;

    if (pause) {
      timer = setTimeout(() => {
        setPause(false);
        setDeleting(false);
      }, 8000);
      return () => clearTimeout(timer);
    }

    if (!deleting) {
      if (display.length < fullText.length) {
        timer = setTimeout(() => setDisplay(fullText.slice(0, display.length + 1)), 180);
      } else {
        setDeleting(true);
      }
    } else {
      if (display.length > 0) {
        timer = setTimeout(() => setDisplay(fullText.slice(0, display.length - 1)), 80);
      } else {
        setPause(true);
      }
    }

    return () => clearTimeout(timer);
  }, [display, deleting, pause]);

  return (
    <div className="typewriter-text">
      <span style={{ fontWeight: 'bold' }}>{display}</span>
      <span className="cursor">|</span>
    </div>
  );
};

// ============================================================
// FOOTER COMPONENT — MAIN WRAPPER
// ============================================================
const Footer = () => {
  // ---------- SAFE LINK OPEN FUNCTION ----------
  const openLinkSafely = (url) => {
    try {
      if (!url || typeof url !== 'string') throw new Error('INVALID URL');
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('LINK OPEN ERROR:', error);
      alert('Sorry, something went wrong while opening the link.');
    }
  };

  return (
    <>
      {/* =======================================================
          CONTACT + FOLLOW + TYPEWRITER WRAPPER (MAIN GRID)
         ======================================================= */}
      <div className="contact-container">
        <div className="contact-follow-wrapper">

          {/* ===================== CONTACT SECTION ===================== */}
          <div className="contact-section card">
            <h2>Contact Us</h2>
            <div className="button-container">
              {/* WHATSAPP BUTTON */}
              <motion.button
                whileHover={{ y: -4, filter: 'brightness(1.2)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => openLinkSafely('https://wa.me/917866049865')}
                className="icon-button"
                aria-label="Contact via WhatsApp"
              >
                <img src={WhatsAppLogo} alt="WhatsApp" className="button-icon" />
              </motion.button>

              {/* EMAIL BUTTON */}
              <motion.button
                whileHover={{ y: -4, filter: 'brightness(1.2)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  openLinkSafely(
                    'https://mail.google.com/mail/?view=cm&fs=1&to=asversity.helpdesk@gmail.com'
                  )
                }
                className="icon-button"
                aria-label="Contact via Email"
              >
                <img src={GmailLogo} alt="Gmail" className="button-icon" />
              </motion.button>
            </div>
          </div>

          {/* ===================== FOLLOW-US SECTION ===================== */}
          <div className="follow-us-section card">
            <h3 className="follow-us-heading">Follow Us</h3>
            <div className="social-icons">
              {[
                {
                  href: 'https://www.instagram.com/xfactorial.in?utm_source=qr&igsh=bXNiNGFjcXFwcnVq',
                  img: InstagramLogo,
                  alt: 'Instagram',
                },
                {
                  href: 'https://youtube.com/@asversity_technologies?si=VM-w53FEMc9aeyiS',
                  img: YouTubeLogo,
                  alt: 'YouTube',
                },
                { href: 'https://www.facebook.com/asversityfacebook...', img: FacebookLogo, alt: 'Facebook' },
                {
                  href: 'https://x.com/comeonsom_?t=GCaq6uE0FodJOuC8854iEg&s=09',
                  img: TwitterLogo,
                  alt: 'Twitter/X',
                },
              ].map(({ href, img, alt }) => (
                <motion.a
                  key={alt}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, filter: 'brightness(1.2)' }}
                  onClick={(e) => {
                    e.preventDefault();
                    openLinkSafely(href);
                  }}
                >
                  <img src={img} alt={alt} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* ===================== TYPEWRITER SECTION ===================== */}
          <div className="typewriter-wrapper card">
            <Typewriter />
          </div>

        </div>
      </div>

      {/* ===================== FOOTER STRIP ===================== */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} OPENROOT. All rights reserved.</p>
        <p>
          <motion.span
            className="clickable-text"
            onClick={() => openLinkSafely(FOUNDER_DETAILS_URL)}
            whileHover={{
              textShadow: '0px 0px 8px var(--color-accent-glow)',
              scale: 1.04,
            }}
          >
            Founder Details
          </motion.span>
          {' | '}
          <motion.span
            className="clickable-text"
            onClick={() => openLinkSafely(TERMS_PAGE_URL)}
            whileHover={{
              textShadow: '0px 0px 8px var(--color-accent-glow)',
              scale: 1.04,
            }}
          >
            Terms of Service
          </motion.span>
        </p>
      </footer>
    </>
  );
};

export default Footer;
