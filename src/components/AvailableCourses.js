// ============================================================
// AVAILABLE COURSES COMPONENT — 2026 READY
// USING LOTTIE ANIMATIONS (COURSES) + STATIC QR IMAGES (PAYMENT)
// CLEAN CODE + BETTER RESOURCE UTILIZATION + DSA THINKING
// ============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Lottie from "lottie-react";
import "../styles/AvailableCourses.css";

// ✅ IMPORT LOTTIE FILES (COURSE THUMBNAILS)
import FinanceLottie from "../assets/lotties/finance-course.json";
import PromptLottie from "../assets/lotties/prompt_course.json";

// ✅ IMPORT QR CODE IMAGES (PAYMENT PURPOSE ONLY)
import FinanceQR from "../assets/FinanceQR.png";
import PromptQR from "../assets/PromptQR.png";

// ============================================================
// COURSE DATA (IMMUTABLE, CENTRALIZED STATE)
// THINKING IN TERMS OF DSA → ARRAY OF OBJECTS (SEARCHABLE, ITERABLE)
// ============================================================
const courses = [
  {
    id: 1,
    name: "Investing & Finance",
    animation: FinanceLottie, // ✅ THUMBNAIL = LOTTIE
    qr: FinanceQR, // ✅ PAYMENT QR RESTORED
    description: [
      "Note: What We Will Cover! (From Scratch)",
      "1. Stock Market",
      "2. Mutual Fund",
      "3. Investment in Gold",
      "4. Lending Money",
      "5. Smart FD",
      "6. Portfolio Management",
      "7. AI Systems in Finance",
    ],
    duration: "4 Months (16 live Classes, 2 hours each)",
    price: "1999 INR",
  },
  {
    id: 2,
    name: "Prompt Engineering",
    animation: PromptLottie, // ✅ THUMBNAIL = LOTTIE
    qr: PromptQR, // ✅ PAYMENT QR RESTORED
    description: [
      "What We Will Cover!:",
      "1. AI-Powered Image Generation.",
      "2. Text-to-Image and Image-to-Video Creation.",
      "3. Custom Banners, Thumbnails, and Graphic Design.",
      "4. Logo and Branding Design.",
      "5. Content Generation for Blogs and Marketing.",
      "6. Real-Time Language Translation and Summarization.",
      "7. Grammar and Style Enhancement for Writing.",
      "8. Email Drafting and Reply Suggestions.",
      "9. Website Development Using AI",
      "10. Resume Building Using AI.",
    ],
    duration: "2 Months (8 live Class, 2 hours each)",
    price: "1199 INR",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
const AvailableCourses = () => {
  // STATE MANAGEMENT → LIKE DSA "STATE MACHINE"
  const [viewState, setViewState] = useState("list"); // list | details | qr
  const [selectedCourse, setSelectedCourse] = useState(null); // HOLDS CURRENT COURSE
  const [showConfetti, setShowConfetti] = useState(false); // CELEBRATION FLAG
  const { width, height } = useWindowSize(); // DYNAMIC SCREEN SIZE FOR CONFETTI

  // ============================================================
  // HANDLER: WHEN USER CLICKS COURSE CARD
  // ============================================================
  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setViewState("details");
  };

  // ============================================================
  // HANDLER: WHEN USER CLICKS PAY
  // ============================================================
  const handlePayClick = () => {
    setShowConfetti(true);
    setViewState("qr");

    // CLEANUP CONFETTI AFTER 5 SECONDS (BETTER RESOURCE UTILIZATION)
    setTimeout(() => setShowConfetti(false), 5000);
  };

  // ============================================================
  // HANDLER: BACK BUTTON → NAVIGATION BASED ON STATE MACHINE
  // ============================================================
  const handleBack = () => {
    if (viewState === "qr") {
      setViewState("details");
    } else if (viewState === "details") {
      setSelectedCourse(null);
      setViewState("list");
    }
  };

  return (
    <div id="available-courses" className="courses-container">
      <h2>Available Courses</h2>

      {/* ============================================================
           LIST VIEW → SHOW ALL COURSES WITH LOTTIE ANIMATIONS
         ============================================================ */}
      {viewState === "list" && (
        <ul className="course-list">
          {courses.map((course) => (
            <li
              key={course.id}
              className="course-item"
              onClick={() => handleCourseClick(course)}
            >
              {/* ✅ LOTTIE ANIMATION INSTEAD OF IMAGE */}
              <Lottie
                animationData={course.animation}
                loop={true}
                className="course-thumbnail"
              />
              <span>{course.name}</span>
            </li>
          ))}
        </ul>
      )}

      {/* ============================================================
           DETAILS VIEW → SHOW SELECTED COURSE INFO
         ============================================================ */}
      {viewState === "details" && selectedCourse && (
        <div className="course-details">
          <button className="back-button" onClick={handleBack}>
            ← Back
          </button>
          <h3>{selectedCourse.name}</h3>
          <div>
            {selectedCourse.description.map((desc, index) => (
              <p key={index}>{desc}</p>
            ))}
          </div>
          <p>
            <strong>Duration:</strong> {selectedCourse.duration}
          </p>
          <div className="price-and-pay">
            <button className="price">Price: {selectedCourse.price}</button>
            <motion.button
              className="pay-button glowing"
              onClick={handlePayClick}
              whileHover={{ scale: 1.1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              💸 Pay Now
            </motion.button>
          </div>
        </div>
      )}

      {/* ============================================================
           QR VIEW → PAYMENT QR + CONFETTI
         ============================================================ */}
      <AnimatePresence>
        {viewState === "qr" && selectedCourse && (
          <motion.div
            className="qr-section"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button className="back-button" onClick={handleBack}>
              ← Back
            </button>
            <h3>🎉 Congratulations!</h3>
            <p>
              You're one step away from unlocking{" "}
              <strong>{selectedCourse.name}</strong> 🎓
            </p>
            <p>Scan the QR code below to complete your payment:</p>

            {/* ✅ QR IMAGE BACK IN PLACE */}
            <img
              src={selectedCourse.qr}
              alt={`${selectedCourse.name} QR Code`}
              className="qr-code"
            />

            <p className="motivator">
              You’re investing in your growth. Let’s go! 🚀
            </p>

            {/* CONFETTI ANIMATION */}
            {showConfetti && <Confetti width={width} height={height} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvailableCourses;

/* ============================================================
   CONCISE EXPLANATION (AS COMMENTS):
   1. LOTTIE FILES = COURSE THUMBNAILS.
   2. STATIC IMAGES = PAYMENT QR CODES (RESTORED).
   3. STATE MACHINE → LIST → DETAILS → QR.
   4. CONFETTI CLEANS UP IN 5s → OPTIMIZED.
   5. FOLLOWED 2026 BEST PRACTICES → CLEAN CODE, RESOURCE-FRIENDLY.
   6. DSA THINKING → ARRAY (courses) + STATE MACHINE (viewState).
   ============================================================ */
