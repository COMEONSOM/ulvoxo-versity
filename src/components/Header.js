// ============================================================
// HEADER COMPONENT — 2026 READY
// CLEAN, RESPONSIVE, AND PERFORMANCE-OPTIMIZED
// NO LOGIN/LOGOUT LOGIC — PURELY UI
// ============================================================
// manforceutube@gmail.com -- firebase project owner email --

import "../styles/Header.css"; // HEADER-SPECIFIC STYLES
import logo from "../assets/logo.png"; // COMPANY LOGO

function Header() {
  return (
    <header className="header">
      {/* ======================================================
         COMPANY LOGO + NAME + SLOGAN
         ====================================================== */}
      <div className="company-info">
        <img src={logo} alt="Company Logo" className="company-logo" />
        <div>
          <div className="CompanyName">ULVOXO VERSITY</div>
          <div className="CompanySlogan">BEYOND POSSIBILITIES</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
