// ============================================================
// 🧩 FOOTER COMPONENT
// Optimized Version — Developer Friendly & Readable
// ------------------------------------------------------------
// Author: SOM BANERJEE
// Date: October 2025
// Notes:
// - Unnecessary scroll animations removed
// - Typewriter text slowed down for readability
// - Added bold styling once sentence completes
// - Extensive developer comments for clarity
// ============================================================

// ---------- IMPORTS ----------
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

// ---------- ASSET IMPORTS ----------
import WhatsAppLogo from '../assets/whatsapp-logo.png';
import GmailLogo from '../assets/gmail-logo.png';
import InstagramLogo from '../assets/instagram-logo.png';
import YouTubeLogo from '../assets/youtube-logo.png';
import FacebookLogo from '../assets/facebook-logo.png';
import TwitterLogo from '../assets/twitter-logo.png';

// ---------- CONSTANTS ----------
const FOUNDER_DETAILS_URL = 'https://www.xfactorial.online/Other-files/founder.html';
const TERMS_PAGE_URL = 'https://www.xfactorial.online/Other-files/terms.html';
const TYPEWRITER_TEXT = 'REDEFINE LEARNING. BREAK THE TRADITIONAL.';

// ============================================================
// 🖋️ TYPEWRITER COMPONENT
// ------------------------------------------------------------
// RESPONSIBLE FOR RENDERING AN ANIMATED TYPEWRITER EFFECT.
// ADDED SLOWER SPEED, BOLD FINAL TEXT, AND LONGER READ PAUSE.
// ============================================================
const Typewriter = () => {
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);
  const [completed, setCompleted] = useState(false); // TRACKS WHEN SENTENCE IS FULLY DISPLAYED

  useEffect(() => {
    const fullText = TYPEWRITER_TEXT;
    let timer;

    // ---------- LONG PAUSE AFTER SENTENCE COMPLETION ----------
    if (pause) {
      timer = setTimeout(() => {
        setPause(false);
        setDeleting(false);
        setCompleted(false);
      }, 8000); // 8 SECONDS PAUSE FOR READABILITY
      return () => clearTimeout(timer);
    }

    // ---------- TYPING PHASE ----------
    if (!deleting) {
      if (display.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplay(fullText.slice(0, display.length + 1));
        }, 180); // TYPING SPEED: SLOWER FOR BETTER VISIBILITY
      } else {
        // ONCE FULL TEXT IS DISPLAYED
        setCompleted(true);
        setDeleting(true);
      }
    }
    // ---------- DELETING PHASE ----------
    else {
      if (display.length > 0) {
        timer = setTimeout(() => {
          setDisplay(fullText.slice(0, display.length - 1));
        }, 80);
      } else {
        // AFTER FULL DELETION, ENTER PAUSE
        setPause(true);
      }
    }

    return () => clearTimeout(timer);
  }, [display, deleting, pause]);

  return (
    <div className="typewriter-text">
      <span style={{ fontWeight: completed ? 'bold' : 'normal' }}>
        {display}
      </span>
      <span className="cursor">|</span>
    </div>
  );
};

// ============================================================
// 🧠 FOOTER COMPONENT
// ------------------------------------------------------------
// CONTAINS CONTACT BUTTONS, SOCIAL LINKS, AND TYPEWRITER SECTION.
// CLEANED ANIMATIONS FOR BETTER PERFORMANCE.
// ============================================================
const Footer = () => {
  // ---------- CTA HANDLERS ----------
  const handleWhatsAppClick = () =>
    window.open('https://wa.me/917866049865', '_blank');

  const handleEmailClick = () =>
    window.open(
      'https://mail.google.com/mail/?view=cm&fs=1&to=asversity.helpdesk@gmail.com',
      '_blank'
    );

  return (
    <>
      {/* ============================================================
           CONTACT & FOLLOW SECTION
           ------------------------------------------------------------
           - COMBINES CONTACT BUTTONS AND SOCIAL ICONS
           - REMOVED VIEWPORT SCROLL ANIMATIONS FOR PERFORMANCE
         ============================================================ */}
      <div className="contact-container">
        <div className="contact-follow-wrapper">
          {/* ---------- CONTACT US SECTION ---------- */}
          <div className="contact-section">
            <h2>Contact Us</h2>
            <div className="button-container">
              {/* WHATSAPP BUTTON */}
              <motion.button
                whileHover={{ y: -6, filter: 'brightness(1.2)' }}
                whileTap={{ scale: 0.96 }}
                onClick={handleWhatsAppClick}
                className="contact-whatsapp-button"
              >
                <img src={WhatsAppLogo} alt="WhatsApp" className="button-icon" />
              </motion.button>

              {/* EMAIL BUTTON */}
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

          {/* ---------- FOLLOW US SECTION ---------- */}
          <div className="follow-us-section">
            <h3 className="follow-us-heading">Follow Us</h3>
            <div className="social-icons">
              {[
                { href: 'https://www.instagram.com/xfactorial.in?utm_source=qr&igsh=bXNiNGFjcXFwcnVq', img: InstagramLogo, alt: 'Instagram' },
                { href: 'https://youtube.com/@asversity_technologies?si=VM-w53FEMc9aeyiS', img: YouTubeLogo, alt: 'YouTube' },
                { href: 'https://www.facebook.com/asversityfacebook...', img: FacebookLogo, alt: 'Facebook' },
                { href: 'https://x.com/comeonsom_?t=GCaq6uE0FodJOuC8854iEg&s=09', img: TwitterLogo, alt: 'Twitter/X' },
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

          {/* ---------- TYPEWRITER DISPLAY ---------- */}
          <div className="typewriter-wrapper">
            <Typewriter />
          </div>
        </div>
      </div>

      {/* ============================================================
           FOOTER STRIP
           ------------------------------------------------------------
           - CONTAINS COPYRIGHT + QUICK LINKS
         ============================================================ */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} OPENROOT. All rights reserved.</p>
        <p>
          {/* FOUNDER DETAILS LINK */}
          <motion.span
            className="clickable-text"
            onClick={() => window.open(FOUNDER_DETAILS_URL, '_blank')}
            whileHover={{
              textShadow: '0px 0px 8px var(--highlight-color)',
              scale: 1.04
            }}
          >
            Founder Details
          </motion.span>

          {' | '}

          {/* TERMS OF SERVICE LINK */}
          <motion.span
            className="clickable-text"
            onClick={() => window.open(TERMS_PAGE_URL, '_blank')}
            whileHover={{
              textShadow: '0px 0px 8px var(--highlight-color)',
              scale: 1.04
            }}
          >
            Terms of Service
          </motion.span>
        </p>
      </footer>
    </>
  );
};

// ---------- EXPORT ----------
export default Footer;
