// ============================================================
// BANNER COMPONENT — PRODUCTION-READY -- VERSION 1.1.4
// - ES2023+ FEATURES
// - MODULAR HELPER FUNCTIONS
// - CLEAR INLINE COMMENTS (CAPS)
// - ERROR HANDLING + EDGE CASES
// - ACCESSIBILITY + KEYBOARD SUPPORT
// - OPTIMIZED TIMERS (NO LEAKS) + REDUCED-MOTION RESPECT
// - TIME COMPLEXITY NOTES INCLUDED
// ============================================================

import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import banner1 from "../assets/banner1.avif";
import banner2 from "../assets/banner2.avif";
import banner3 from "../assets/banner3.avif";
import "../styles/Banner.css";

// ============================================================
// UTILITY: SLEEP (ASYNC-AWAIT READY FOR ANY FUTURE ASYNC NEEDS)
// NOTE: THIS IS O(1) TIME/SPACE; USEFUL WHEN AWAITING TIMERS
// ============================================================
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================================
// UTILITY: SAFE CLAMP INDEX (HANDLES EDGE CASES WHEN EMPTY)
// TIME COMPLEXITY: O(1)
// ============================================================
const clampIndex = (index, length) => {
  // RETURN 0 IF NO SLIDES (SAFETY)
  if (!length || length <= 0) return 0;
  // NORMALIZE INDEX INTO [0, length-1]
  return ((index % length) + length) % length;
};

// ============================================================
// DEFAULT BANNERS (CAN BE OVERRIDDEN VIA PROPS)
// ============================================================
const DEFAULT_BANNERS = [
  { id: 1, image: banner1, alt: "Banner 1" },
  { id: 2, image: banner2, alt: "Banner 2" },
  { id: 3, image: banner3, alt: "Banner 3" },
];

export default function Banner({ banners = DEFAULT_BANNERS, autoRotateMs = 10000 }) {
  // ============================================================
  // SAFETY: VALIDATE BANNERS
  // ============================================================
  if (!Array.isArray(banners)) {
    throw new TypeError("BANNERS MUST BE AN ARRAY");
  }

  const slideCount = banners.length;

  // ============================================================
  // EDGE CASE: NO SLIDES -> RENDER PLACEHOLDER
  // ============================================================
  if (slideCount === 0) {
    return (
      <section className="home-banner placeholder" aria-live="polite">
        <div className="banner-placeholder">NO BANNERS AVAILABLE</div>
      </section>
    );
  }

  // ============================================================
  // INTERNAL STATE
  // - current: INDEX OF VISIBLE SLIDE IN [0..slideCount-1]
  // - anim: ENABLE/DISABLE TRANSITION (USED WHEN JUMPING FROM CLONE)
  // - hovered: MOUSE HOVER PAUSES INDEFINITELY
  // - userInteractedAt: TIMESTAMP FOR PAUSING AUTO-ROTATE
  // ============================================================
  const [current, setCurrent] = useState(0);
  const [anim, setAnim] = useState(true);
  const [hovered, setHovered] = useState(false);
  const userInteractedAt = useRef(0);

  // ============================================================
  // REFS FOR TIMERS (PREVENT LEAKS)
  // ============================================================
  const intervalRef = useRef(null);
  const restartTimeoutRef = useRef(null);

  // ============================================================
  // SWIPE STATE (POINTER-BASED FOR BETTER CROSS-BROWSER SUPPORT)
  // ============================================================
  const pointerStartX = useRef(null);
  const pointerLastX = useRef(null);
  const SWIPE_THRESHOLD = 50; // PX

  // ============================================================
  // REDUCED MOTION: RESPECT USER PREFERENCE
  // ============================================================
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    try {
      prefersReducedMotion.current = window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;
    } catch (err) {
      // MATCHMEDIA CAN THROW IN SOME ENV (E.G., SSR) — FALLBACK TO FALSE
      prefersReducedMotion.current = false;
    }
  }, []);

  // ============================================================
  // CLEAR TIMERS HELPER
  // TIME COMPLEXITY: O(1)
  // ============================================================
  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
  }, []);

  // ============================================================
  // START AUTO ROTATE (SEE: PAUSE RULES BELOW)
  // - IF PREFERS REDUCED MOTION -> DO NOT START
  // TIME COMPLEXITY: O(1)
  // ============================================================
  const startAutoRotate = useCallback(
    (delay = autoRotateMs) => {
      clearTimers();
      if (prefersReducedMotion.current) return; // RESPECT USER

      // USE setInterval FOR O(1) TICK COST
      intervalRef.current = setInterval(() => {
        setCurrent((c) => clampIndex(c + 1, slideCount));
      }, delay);
    },
    [autoRotateMs, clearTimers, slideCount]
  );

  // ============================================================
  // PAUSE AFTER USER INTERACTION
  // - PAUSE IMMEDIATELY, THEN RESTART AFTER 30s UNLESS HOVERED
  // - THIS IS O(1)
  // ============================================================
  const pauseAfterInteraction = useCallback(() => {
    clearTimers();
    userInteractedAt.current = Date.now();
    restartTimeoutRef.current = setTimeout(() => {
      if (!hovered) startAutoRotate();
    }, 30000);
  }, [clearTimers, hovered, startAutoRotate]);

  // ============================================================
  // EFFECT: INITIALIZE AUTO-ROTATE ON MOUNT
  // ============================================================
  useEffect(() => {
    startAutoRotate();
    return () => clearTimers();
  }, [startAutoRotate, clearTimers]);

  // ============================================================
  // NAVIGATION HELPERS (O(1) OPERATIONS)
  // ============================================================
  const goTo = useCallback((targetIndex) => {
    // SAFELY CLAMP TARGET
    const next = clampIndex(targetIndex, slideCount);
    setCurrent(next);
  }, [slideCount]);

  const goNext = useCallback(() => goTo(current + 1), [goTo, current]);
  const goPrev = useCallback(() => goTo(current - 1), [goTo, current]);

  // ============================================================
  // HANDLE DOT CLICK
  // ============================================================
  const handleDotClick = (idx) => {
    goTo(idx);
    pauseAfterInteraction();
  };

  // ============================================================
  // POINTER (MOUSE/FINGER) HANDLERS FOR SWIPE
  // - USING POINTER EVENTS FOR CONSISTENT BEHAVIOR
  // ============================================================
  const handlePointerDown = (e) => {
    try {
      pointerStartX.current = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      pointerLastX.current = pointerStartX.current;
      // WHEN USER STARTS POINTER, PAUSE AUTO-ROTATE
      pauseAfterInteraction();
    } catch (err) {
      // IGNORE POINTER ERRORS SO UI DOESN'T CRASH
      console.error("POINTER START ERROR", err);
    }
  };

  const handlePointerMove = (e) => {
    pointerLastX.current = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? pointerLastX.current;
  };

  const handlePointerUp = async () => {
    const start = pointerStartX.current ?? 0;
    const end = pointerLastX.current ?? start;
    const delta = start - end;

    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta > 0) goNext();
      else goPrev();
    }

    // RESET POINTERS (O(1))
    pointerStartX.current = null;
    pointerLastX.current = null;

    // SHORT AWAIT TO ALLOW UI TO SETTLE (ASYNC EXAMPLE)
    await sleep(0);
  };

  // ============================================================
  // HOVER HANDLERS
  // ============================================================
  const onMouseEnter = () => {
    setHovered(true);
    clearTimers(); // STOP AUTO-ROTATE UNTIL LEAVE
  };

  const onMouseLeave = () => {
    setHovered(false);
    // RESUME UNLESS USER RECENTLY INTERACTED
    const since = Date.now() - (userInteractedAt.current || 0);
    if (since < 30000) {
      // REMAIN PAUSED; RESTART AFTER REMAINING TIME
      const remaining = Math.max(0, 30000 - since);
      restartTimeoutRef.current = setTimeout(() => startAutoRotate(), remaining);
    } else {
      startAutoRotate();
    }
  };

  // ============================================================
  // KEYBOARD NAVIGATION (ACCESSIBILITY)
  // ============================================================
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      goPrev();
      pauseAfterInteraction();
    } else if (e.key === "ArrowRight") {
      goNext();
      pauseAfterInteraction();
    }
  };

  // ============================================================
  // TRANSITION CONTROL: DISABLE TRANSITION BRIEFLY WHEN JUMPING
  // (NOT NECESSARY HERE SINCE WE DO SIMPLE INDEXING, BUT LEFT FOR
  // EXTENSIBILITY IF CLONED SLIDES ARE USED)
  // ============================================================
  useEffect(() => {
    // BRIEFLY ENABLE/DISABLE TRANSITION IF NEEDED
    setAnim(true);
    return () => {};
  }, [current]);

  // ============================================================
  // RENDER: STYLE TRANSFORM BASED ON INDEX
  // - USING PERCENTAGE TRANSLATE FOR O(1) COMPUTATION
  // ============================================================
  const translate = `translateX(-${current * 100}%)`;
  const transitionStyle = anim && !prefersReducedMotion.current ? "transform 0.5s ease-in-out" : "none";

  return (
    <section
      className="home-banner"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      tabIndex={0} // MAKE IT FOCUSABLE FOR KEYBOARD
      role="region"
      aria-roledescription="carousel"
      aria-label="Homepage banners"
    >
      {/* SLIDER CONTAINER */}
      <div
        className="banner-container"
        style={{ transform: translate, transition: transitionStyle }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        aria-live="polite"
      >
        {banners.map(({ id, image, alt }, idx) => (
          <div key={`${id}-${idx}`} className="banner-slide" aria-hidden={current !== idx}>
            <img src={image} alt={alt ?? `Banner ${idx + 1}`} className="banner-image" draggable={false} />
          </div>
        ))}
      </div>

      {/* NAVIGATION ARROWS */}
      <button
        className="arrow left-arrow"
        aria-label="Previous banner"
        onClick={() => {
          goPrev();
          pauseAfterInteraction();
        }}
      >
        ‹
      </button>

      <button
        className="arrow right-arrow"
        aria-label="Next banner"
        onClick={() => {
          goNext();
          pauseAfterInteraction();
        }}
      >
        ›
      </button>

      {/* DOTS */}
      <div className="dots-container" role="tablist" aria-label="Banner pagination">
        {banners.map((_, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={current === idx}
            className={`dot ${current === idx ? "active" : ""}`}
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ============================================================
// PROP TYPES
// ============================================================
Banner.propTypes = {
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ),
  autoRotateMs: PropTypes.number,
};

// ============================================================
// NOTE ON COMPLEXITY:
// - RENDER: O(n) TO MAP SLIDES (WHERE n = NUMBER OF SLIDES)
// - NAVIGATION: O(1) FOR NEXT/PREV/DOT
// - MEMORY: O(n) TO STORE SLIDE DATA
// - THIS COMPONENT AIMS TO MINIMIZE PER-TICK WORK (INTERVAL JUST
//   UPDATES AN INDEX; RE-RENDER COST DOM DIFFING WHICH IS O(n) IN
//   THE NUMBER OF VISIBLE CHILDREN BUT ACCEPTABLE FOR SMALL n)
// ============================================================
