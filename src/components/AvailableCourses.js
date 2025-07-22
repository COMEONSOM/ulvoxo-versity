import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import '../styles/AvailableCourses.css';
import FinanceQR from '../assets/FinanceQR.png';
import PromptQR from '../assets/PromptQR.png';
import FinanceImage from '../assets/mf.jpg';
import PromptImage from '../assets/prompt.jpg';

const courses = [
    {
        id: 1,
        name: 'Finance',
        image: FinanceImage,
        qr: FinanceQR,
        description: [
            'Note: What We Will Cover! (From Scratch)',
            '1. Stock Market',
            '2. Mutual Fund',
            '3. Investment in Gold',
            '4. Lending Money',
            '5. Smart FD',
            '6. Portfolio Management',
            '7. AI Systems in Finance',
        ],
        duration: '4 Months (16 live Classes, 2 hours each)',
        price: '1999 INR',
    },
    {
        id: 2,
        name: 'Prompt Engineering',
        image: PromptImage,
        qr: PromptQR,
        description: [
            'What We Will Cover!:',
            '1. AI-Powered Image Generation.',
            '2. Text-to-Image and Image-to-Video Creation.',
            '3. Custom Banners, Thumbnails, and Graphic Design.',
            '4. Logo and Branding Design.', 
            '5. Content Generation for Blogs and Marketing.',
            '6. Real-Time Language Translation and Summarization.', 
            '7. Grammar and Style Enhancement for Writing.',
            '8. Email Drafting and Reply Suggestions.',
            '9. Website Development Using AI',
            '10. Resume Building Using AI.',
        ],
        duration: '2 Months (8 live Class, 2 hours each)',
        price: '1199 INR',
    },
];

const AvailableCourses = () => {
    const [viewState, setViewState] = useState('list');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
        setViewState('details');
    };

    const handlePayClick = () => {
        setShowConfetti(true);
        setViewState('qr');

        // Hide confetti after 5s
        setTimeout(() => setShowConfetti(false), 5000);
    };

    const handleBack = () => {
        if (viewState === 'qr') {
            setViewState('details');
        } else if (viewState === 'details') {
            setSelectedCourse(null);
            setViewState('list');
        }
    };

    return (
        <div id="available-courses" className="courses-container">
            <h2>Available Courses</h2>

            {viewState === 'list' && (
                <ul className="course-list">
                    {courses.map((course) => (
                        <li key={course.id} className="course-item" onClick={() => handleCourseClick(course)}>
                            <img src={course.image} alt={`${course.name} thumbnail`} className="course-thumbnail" />
                            <span>{course.name}</span>
                        </li>
                    ))}
                </ul>
            )}

            {viewState === 'details' && selectedCourse && (
                <div className="course-details">
                    <button className="back-button" onClick={handleBack}>← Back</button>
                    <h3>{selectedCourse.name}</h3>
                    <div>
                        {selectedCourse.description.map((desc, index) => (
                            <p key={index}>{desc}</p>
                        ))}
                    </div>
                    <p><strong>Duration:</strong> {selectedCourse.duration}</p>
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

            <AnimatePresence>
                {viewState === 'qr' && selectedCourse && (
                    <motion.div
                        className="qr-section"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <button className="back-button" onClick={handleBack}>← Back</button>
                        <h3>🎉 Congratulations!</h3>
                        <p>You're one step away from unlocking <strong>{selectedCourse.name}</strong> 🎓</p>
                        <p>Scan the QR code below to complete your payment:</p>
                        <img src={selectedCourse.qr} alt={`${selectedCourse.name} QR Code`} className="qr-code" />
                        <p className="motivator">You’re investing in your growth. Let’s go! 🚀</p>

                        {showConfetti && <Confetti width={width} height={height} />}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AvailableCourses;
