import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

// Initialize Animate On Scroll
AOS.init({
  duration: 900,
  delay: 150,
  once: true,
  offset: 100,
  easing: 'ease-in-out'
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
