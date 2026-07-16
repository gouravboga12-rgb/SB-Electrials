import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import SplashScreen from './components/SplashScreen';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import WhyChooseUs from './pages/WhyChooseUs';
import Contact from './pages/Contact';
import Calculator from './pages/Calculator';
import Gallery from './pages/Gallery';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white text-slate-800 font-sans">
          {/* Sticky Navbar */}
          <Navbar />
          
          {/* Main Content Area */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/why-choose-us" element={<WhyChooseUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* High Conversion Floating CTA Elements */}
          <FloatingWhatsApp />
          <BackToTop />
        </div>
      </Router>
    </>
  );
}

export default App;
