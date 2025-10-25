// ============================================================
// AVAILABLE COURSES COMPONENT — VERSION 1.1.4
// ASYNC LOGIC + DSA APPROACH + ERROR HANDLING + PERFORMANCE OPTIMIZATION
// ============================================================

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Lottie from "lottie-react";
import "../styles/AvailableCourses.css";

// ✅ IMPORT LOTTIE + QR IMAGES
import FinanceLottie from "../assets/lotties/finance-course.json";
import PromptLottie from "../assets/lotties/prompt_course.json";
import FinanceQR from "../assets/FinanceQR.png";
import PromptQR from "../assets/PromptQR.png";

// ============================================================
// IMMUTABLE COURSE DATA (STATIC MEMORY — O(1) LOOKUP)
// ============================================================
const COURSE_DATA = Object.freeze([
  {
    id: 1,
    name: "Investing & Finance",
    animation: FinanceLottie,
    qr: FinanceQR,
    description: [
      "Note: What We Will Cover! (From Scratch)",
      "1. Stock Market",
      "2. Mutual Fund",
      "3. Investment in Gold",
      "4. Lending Money",
      "5. Smart FD",
      "6. Portfolio Management",
      "7. AI Systems in Finance",
      " Stock Market From Scratch + Value Investing both included [NO EXTRA CHARGE].",
    ],
    duration: "4 Months (16 live Classes, 2 hours each)",
    price: "1769 INR",
  },
  {
    id: 2,
    name: "Prompt Engineering",
    animation: PromptLottie,
    qr: PromptQR,
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
      "9. Resume Building Using AI.",
      "10. Website Development Using AI (MAIN COMPONENT)",
    ],
    duration: "2 Months (8 live Class, 2 hours each)",
    price: "1249 INR",
  },
]);

// ============================================================
// HELPER FUNCTION — FETCH COURSE BY ID (O(n) SEARCH OPTIMIZED TO O(1) USING MAP)
// ============================================================
const useCourseLookup = () => {
  const courseMap = useMemo(
    () => new Map(COURSE_DATA.map((course) => [course.id, course])),
    []
  );
  const getCourseById = useCallback(
    (id) => courseMap.get(id) ?? null,
    [courseMap]
  );
  return { getCourseById };
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const AvailableCourses = () => {
  const [viewState, setViewState] = useState("list"); // list | details | qr
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const { getCourseById } = useCourseLookup();

  // ============================================================
  // HANDLER: COURSE SELECTION → CONSTANT TIME RETRIEVAL (O(1))
  // ============================================================
  const handleCourseClick = useCallback(
    async (courseId) => {
      try {
        // SIMULATE ASYNC OPERATION (EX: FETCHING DATA FROM DB)
        const course = await Promise.resolve(getCourseById(courseId));
        if (!course) throw new Error("Course not found!");
        setSelectedCourse(course);
        setViewState("details");
      } catch (err) {
        console.error("❌ ERROR WHILE SELECTING COURSE:", err.message);
        alert("Something went wrong while loading the course.");
      }
    },
    [getCourseById]
  );

  // ============================================================
  // HANDLER: PAY ACTION → CELEBRATION + STATE TRANSITION
  // ============================================================
  const handlePayClick = useCallback(async () => {
    try {
      setShowConfetti(true);
      setViewState("qr");

      // CLEANUP CONFETTI AFTER 5 SECONDS (RESOURCE OPTIMIZATION)
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setShowConfetti(false);
    } catch (err) {
      console.error("❌ ERROR WHILE PROCESSING PAYMENT:", err.message);
      alert("Payment process interrupted. Try again.");
    }
  }, []);

  // ============================================================
  // HANDLER: BACK NAVIGATION (STATE MACHINE REVERSAL)
  // ============================================================
  const handleBack = useCallback(() => {
    setViewState((prev) => {
      if (prev === "qr") return "details";
      if (prev === "details") {
        setSelectedCourse(null);
        return "list";
      }
      return prev;
    });
  }, []);

  // ============================================================
  // CLEANUP EFFECT → PREVENT MEMORY LEAKS (O(1))
  // ============================================================
  useEffect(() => {
    return () => {
      setShowConfetti(false);
    };
  }, []);

  // ============================================================
  // RENDER JSX → STATE MACHINE OUTPUT (O(1) PER STATE)
  // ============================================================
  return (
    <div id="available-courses" className="courses-container">
      <h2>Available Courses</h2>

      {/* ============================================================
           LIST VIEW → LOTTIE-BASED COURSE DISPLAY
         ============================================================ */}
      {viewState === "list" && (
        <ul className="course-list">
          {COURSE_DATA.map(({ id, name, animation }) => (
            <li
              key={id}
              className="course-item"
              onClick={() => handleCourseClick(id)}
            >
              <Lottie animationData={animation} loop className="course-thumbnail" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      )}

      {/* ============================================================
           DETAILS VIEW → DYNAMIC COURSE INFORMATION
         ============================================================ */}
      {viewState === "details" && selectedCourse && (
        <section className="course-details">
          <button className="back-button" onClick={handleBack}>
            ← BACK
          </button>
          <h3>{selectedCourse.name}</h3>
          <div>
            {selectedCourse.description.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <p>
            <strong>Duration:</strong> {selectedCourse.duration}
          </p>
          <div className="price-and-pay">
            <button className="price">💰 {selectedCourse.price}</button>
            <motion.button
              className="pay-button glowing"
              onClick={handlePayClick}
              whileHover={{ scale: 1.1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              💸 PAY NOW
            </motion.button>
          </div>
        </section>
      )}

      {/* ============================================================
           QR VIEW → PAYMENT STAGE + CONFETTI
         ============================================================ */}
      <AnimatePresence>
        {viewState === "qr" && selectedCourse && (
          <motion.section
            className="qr-section"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button className="back-button" onClick={handleBack}>
              ← BACK
            </button>
            <h3>🎉 CONGRATULATIONS!</h3>
            <p>
              YOU’RE ONE STEP AWAY FROM UNLOCKING{" "}
              <strong>{selectedCourse.name}</strong> 🎓
            </p>
            <p>SCAN THE QR CODE BELOW TO COMPLETE YOUR PAYMENT:</p>

            <img
              src={selectedCourse.qr}
              alt={`${selectedCourse.name} QR`}
              className="qr-code"
            />

            <p className="motivator">
              YOU’RE INVESTING IN YOUR GROWTH. LET’S GO 🚀
            </p>
            <p>
              AFTER PAYMENT, SHARE THE SCREENSHOT ON WHATSAPP FOR FURTHER
              UPDATES.
            </p>
            <p>
              IF NO SLOT IS FOUND AVAILABLE, YOUR MONEY WILL BE REFUNDED WITHIN
              24 HOURS.
            </p>

            {showConfetti && <Confetti width={width} height={height} />}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvailableCourses;

// ============================================================
// PERFORMANCE NOTES:
// 1️⃣ DATA STRUCTURE: COURSE MAP FOR O(1) LOOKUPS.
// 2️⃣ ASYNC HANDLERS ENSURE RESPONSIVE UI (NON-BLOCKING).
// 3️⃣ useMemo + useCallback PREVENT UNNECESSARY RE-RENDERS (O(1) CACHE).
// 4️⃣ STATE MACHINE LOGIC ENSURES PREDICTABLE FLOW.
// 5️⃣ CLEANUP EFFECTS AVOID MEMORY LEAKS.
// ============================================================

