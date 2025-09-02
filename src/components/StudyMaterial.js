// ============================================================
// STUDY MATERIAL COMPONENT — 2026 READY
// CLEAN, SCALABLE, AND PERFORMANCE-OPTIMIZED
// RENDERING ROUND BUTTONS WITH LOTTIE ANIMATIONS
// ============================================================

import { useCallback } from "react";
import Lottie from "lottie-react";
import "../styles/StudyMaterial.css"; // STYLES

// ============================================================
// SAMPLE STUDY MATERIAL DATA
// - title: name of material
// - link: Google Drive URL
// - animation: Lottie JSON (imported from /assets)
// ============================================================
import pythonAnim from "../assets/lotties/python.json";
import CSEAnim from "../assets/lotties/cse-basics.json";
import financeAnim from "../assets/lotties/finance.json";

const studyMaterials = [
  {
    title: "Python",
    link: "https://drive.google.com/drive/folders/1IQerh93elt4mBQRdRZ_42yYv4Dv0ipTm", // YOUR GOOGLE DRIVE LINK
    animation: pythonAnim,
  },
  {
    title: "CSE BASICS",
    link: "https://drive.google.com/drive/folders/1kgOl_U_rbCHRChY2F6JdCiUW7qsEnaWt",
    animation: CSEAnim,
  },
  {
    title: "FINANCE",
    link: "https://drive.google.com/drive/folders/1tnPiNCIiElutXDcEveQppmMkbGp1Q8Q1",
    animation: financeAnim,
  },
];

function StudyMaterial() {
  // ==========================================================
  // HELPER FUNCTION — SAFE LINK OPEN
  // ==========================================================
  const handleOpenLink = useCallback((url) => {
    try {
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        console.warn("⚠️ Invalid study material link provided.");
      }
    } catch (error) {
      console.error("❌ ERROR OPENING LINK:", error.message);
    }
  }, []);

  return (
    <section id="study-material" className="study-material">
      <h2 className="study-title"> Study Materials</h2>
      <div className="study-grid">
        {studyMaterials.map((item, index) => (
          <button
            key={index}
            className="study-card"
            onClick={() => handleOpenLink(item.link)}
          >
            <div className="study-animation">
              <Lottie animationData={item.animation} loop={true} />
            </div>
            <span className="study-label">{item.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default StudyMaterial;
