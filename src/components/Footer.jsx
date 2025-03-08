import React from "react";
import "./../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-1">&copy; 2025 Gig Worker Resource Hub. All rights reserved.</p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="/privacy-policy" className="text-white text-decoration-none">Privacy Policy</a>
          </li>
          <li className="list-inline-item">
            <a href="/terms-of-service" className="text-white text-decoration-none">Terms of Service</a>
          </li>
          <li className="list-inline-item">
            <a href="/contact-us" className="text-white text-decoration-none">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
