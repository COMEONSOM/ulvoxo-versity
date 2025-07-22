// src/App.jsx
import Header from './components/Header';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import AvailableCourses from './components/AvailableCourses';
import FreeContent from './components/FreeContent';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Banner />
      <AvailableCourses />
      <FreeContent />
      <Footer />
    </>
  );
}

export default App;
