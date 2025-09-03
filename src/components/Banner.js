// ============================================================
// BANNER COMPONENT — FLIPKART STYLE (2025 BEST PRACTICE)
// Infinite scroll + arrows + dots + swipe + smart auto-rotate
// - Auto rotates every 10s
// - If user interacts → pause auto-rotate for 30s
// - If cursor hovers → pause indefinitely until mouse leaves
// ============================================================

import { useState, useEffect, useRef } from "react";
import "../styles/Banner.css";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

function Banner() {
  // ============================================================
  // BASE SLIDES
  // ============================================================
  const banners = [
    { id: 1, image: banner1 },
    { id: 2, image: banner2 },
    { id: 3, image: banner3 },
  ];

  // ============================================================
  // CLONED SLIDES FOR LOOPING
  // ============================================================
  const extendedBanners = [
    banners[banners.length - 1], // cloned last
    ...banners, // real
    banners[0], // cloned first
  ];

  // ============================================================
  // STATE
  // ============================================================
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const swipeThreshold = 50;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const autoRotateRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  // ============================================================
  // CLEANUP TIMERS
  // ============================================================
  const clearTimers = () => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
  };

  // ============================================================
  // START AUTO-ROTATE (NORMAL = 10s)
  // ============================================================
  const startAutoRotate = (delay = 10000) => {
    clearTimers();
    autoRotateRef.current = setInterval(() => {
      goToNext();
    }, delay);
  };

  // ============================================================
  // PAUSE AFTER USER INTERACTION
  // - Stop auto-rotate immediately
  // - Wait 30s before restarting
  // ============================================================
  const pauseAfterInteraction = () => {
    clearTimers();
    resetTimeoutRef.current = setTimeout(() => {
      if (!isHovered) {
        startAutoRotate(10000);
      }
    }, 30000);
  };

  // ============================================================
  // INIT AUTO-ROTATE ON MOUNT
  // ============================================================
  useEffect(() => {
    startAutoRotate(10000);
    return () => clearTimers();
  }, []);

  // ============================================================
  // TRANSITION END HANDLER
  // ============================================================
  const handleTransitionEnd = () => {
    setIsAnimating(false);

    if (currentIndex === 0) {
      setCurrentIndex(banners.length);
    } else if (currentIndex === banners.length + 1) {
      setCurrentIndex(1);
    }

    setTimeout(() => setIsAnimating(true), 50);
  };

  // ============================================================
  // NAVIGATION FUNCTIONS
  // ============================================================
  const goToNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleDotClick = (idx) => {
    setCurrentIndex(idx + 1);
    pauseAfterInteraction();
  };

  // ============================================================
  // TOUCH HANDLERS
  // ============================================================
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > swipeThreshold) {
      goToNext();
    } else if (distance < -swipeThreshold) {
      goToPrev();
    }
    pauseAfterInteraction();
  };

  // ============================================================
  // HOVER HANDLERS
  // ============================================================
  const handleMouseEnter = () => {
    setIsHovered(true);
    clearTimers(); // stop auto-rotate
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    startAutoRotate(10000); // resume normal auto-rotate
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <section
      className="home-banner"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* SLIDER CONTAINER */}
      <div
        className="banner-container"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isAnimating ? "transform 0.5s ease-in-out" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {extendedBanners.map(({ id, image }, idx) => (
          <div key={id + "-" + idx} className="banner-slide">
            <img src={image} alt={`Banner ${id}`} className="banner-image" />
          </div>
        ))}
      </div>

      {/* NAVIGATION ARROWS */}
      <button
        className="arrow left-arrow"
        onClick={() => {
          goToPrev();
          pauseAfterInteraction();
        }}
      >
        &lt;
      </button>
      <button
        className="arrow right-arrow"
        onClick={() => {
          goToNext();
          pauseAfterInteraction();
        }}
      >
        &gt;
      </button>

      {/* DOTS INDICATOR */}
      <div className="dots-container">
        {banners.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${currentIndex === idx + 1 ? "active" : ""}`}
            onClick={() => handleDotClick(idx)}
          />
        ))}
      </div>
    </section>
  );
}

export default Banner;
