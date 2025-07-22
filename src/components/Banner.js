// src/components/Banner.js
import { useState, useEffect } from 'react';
import '../styles/Banner.css';
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';

function Banner() {
  const banners = [
    { id: 1, image: banner1 },
    { id: 2, image: banner2 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const swipeThreshold = 50;

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleTouchStart = (e) =>
    setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    const distance = touchStart - touchEnd;
    if (distance > swipeThreshold) {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    } else if (distance < -swipeThreshold) {
      setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }
  };

  const goToNext = () =>
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  const handleDotClick = (idx) => setCurrentIndex(idx);

  return (
    <section className="home-banner">
      <div
        className="banner-container"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {banners.map(({ id, image }) => (
          <div key={id} className="banner-slide">
            <img
              src={image}
              alt={`Banner ${id}`}
              className="banner-image"
            />
          </div>
        ))}
      </div>

      <button className="arrow left-arrow" onClick={goToPrev}>&lt;</button>
      <button className="arrow right-arrow" onClick={goToNext}>&gt;</button>

      <div className="dots-container">
        {banners.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => handleDotClick(idx)}
          />
        ))}
      </div>
    </section>
  );
}

export default Banner;
