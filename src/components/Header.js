// ============================================================
// HEADER COMPONENT — 2026 READY
// CLEAN, RESPONSIVE, AND PERFORMANCE-OPTIMIZED
// NO LOGIN/LOGOUT LOGIC — PURELY UI
// ============================================================
// manforceutube@gmail.com -- firebase project owner email --

import "../styles/Header.css"; // HEADER-SPECIFIC STYLES
import logo from "../assets/openroot-logo.svg"; // COMPANY LOGO

function Header() {
  return (
    <header className="header">
      {/* ======================================================
         COMPANY LOGO + NAME + SLOGAN
         ====================================================== */}
      <div className="company-info">
        <img src={logo} alt="Company Logo" className="company-logo" />
        <span className="brand-tag">#classes</span>
      </div>
    </header>
  );
}

export default Header;
