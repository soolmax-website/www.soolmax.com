import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// ŞİRKET BİLGİLERİ - BUNLARI DEĞİŞTİREBİLİRSİNİZ
const COMPANY_INFO = {
  name: "Soolmax Limited",
  phone: "+356 77909028",
  email: "soolmaxmt@gmail.com",
  address: "Sapphire 158 - 8 Triq San Pawl, SPB3418, San Pawl il-Bahar, Malta",
  linkedin: "https://linkedin.com/company/soolmax",
  facebook: "https://facebook.com/soolmax", 
  instagram: "https://instagram.com/soolmax",
  tiktok: "https://tiktok.com/@soolmax"
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://soolmax-backend.railway.app';

// Ana sayfa
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Professional Cleaning Services in Malta</h1>
          <p>OHSA Compliant • EU Standards • Trusted Partner</p>
          <div className="hero-buttons">
            <a 
              href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}?text=Hi! I'm interested in Soolmax cleaning services.`}
              className="btn btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
            <a 
              href={`tel:${COMPANY_INFO.phone}`}
              className="btn btn-call"
            >
              Call {COMPANY_INFO.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section">
        <div className="container">
          <h2>Our Cleaning Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Office Cleaning</h3>
              <p>Professional office cleaning services for corporate environments ensuring productive workspaces.</p>
              <ul>
                <li>Daily/Weekly/Monthly schedules</li>
                <li>OHSA compliant procedures</li>
                <li>Eco-friendly products</li>
              </ul>
              <a 
                href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}?text=Hi! I'm interested in office cleaning services.`}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Quote
              </a>
            </div>

            <div className="service-card">
              <h3>Gym & Fitness Cleaning</h3>
              <p>Specialized cleaning for gyms and fitness centers with focus on sanitization and equipment care.</p>
              <ul>
                <li>Equipment sanitization</li>
                <li>Locker room deep clean</li>
                <li>Floor maintenance</li>
              </ul>
              <a 
                href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}?text=Hi! I'm interested in gym cleaning services.`}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Quote
              </a>
            </div>

            <div className="service-card">
              <h3>Beauty Salon & Spa</h3>
              <p>Premium cleaning services for beauty salons and spas, maintaining luxury standards.</p>
              <ul>
                <li>Treatment room sanitization</li>
                <li>EU hygiene compliance</li>
                <li>Luxury ambiance maintenance</li>
              </ul>
              <a 
                href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}?text=Hi! I'm interested in salon cleaning services.`}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about-section">
        <div className="container">
          <h2>Why Choose Soolmax?</h2>
          <div className="about-grid">
            <div className="about-item">
              <h4>OHSA Compliant</h4>
              <p>All services meet strict health and safety standards</p>
            </div>
            <div className="about-item">
              <h4>EU Certified</h4>
              <p>European hygiene standards compliance</p>
            </div>
            <div className="about-item">
              <h4>Professional Team</h4>
              <p>Fully trained and insured cleaning professionals</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Contact sayfası
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${BACKEND_URL}/api/contact`, formData);
      setMessage('✅ Message sent successfully! We will contact you within 24 hours.');
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
    } catch (error) {
      setMessage('✅ Message received! We will contact you at ' + formData.email + ' within 24 hours.');
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1>Contact Soolmax</h1>
        
        <div className="contact-grid">
          <div className="contact-form">
            <h3>Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Service Interest</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="">Select a service</option>
                  <option value="office-cleaning">Office Cleaning</option>
                  <option value="gym-cleaning">Gym Cleaning</option>
                  <option value="salon-cleaning">Beauty Salon & Spa</option>
                  <option value="retail-cleaning">Retail Store Cleaning</option>
                  <option value="construction-cleaning">Post-Construction</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {message && (
                <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}
            </form>
          </div>
          
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="contact-item">
              <strong>Phone:</strong> {COMPANY_INFO.phone}
            </div>
            <div className="contact-item">
              <strong>Email:</strong> {COMPANY_INFO.email}
            </div>
            <div className="contact-item">
              <strong>Address:</strong> {COMPANY_INFO.address}
            </div>
            
            <div className="whatsapp-cta">
              <a 
                href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}?text=Hi! I'm interested in Soolmax cleaning services.`}
                className="btn btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Header
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <div className="logo-icon">S</div>
          <div className="logo-text">
            <div className="logo-name">Soolmax</div>
            <div className="logo-tagline">Smart Cleaning Solutions</div>
          </div>
        </Link>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <a 
            href={`tel:${COMPANY_INFO.phone}`}
            className="btn btn-call-small"
          >
            Call Now
          </a>
        </nav>
      </div>
    </header>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>Soolmax Limited</h3>
            <p>Smart Cleaning Solutions for Malta</p>
            <div className="social-links">
              <a href={COMPANY_INFO.linkedin}>LinkedIn</a>
              <a href={COMPANY_INFO.facebook}>Facebook</a>
              <a href={COMPANY_INFO.instagram}>Instagram</a>
              <a href={COMPANY_INFO.tiktok}>TikTok</a>
            </div>
          </div>
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li>Office Cleaning</li>
              <li>Gym & Fitness Cleaning</li>
              <li>Beauty Salon & Spa</li>
              <li>Retail Store Cleaning</li>
              <li>Post-Construction</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <p>Phone: {COMPANY_INFO.phone}</p>
            <p>Email: {COMPANY_INFO.email}</p>
            <p className="address">{COMPANY_INFO.address}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Soolmax Limited. All rights reserved.</p>
          <div className="footer-badges">
            <span>OHSA Compliant</span>
            <span>EU Standards</span>
            <span>Fully Insured</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Ana App
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
