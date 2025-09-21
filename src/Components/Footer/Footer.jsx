import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FaInstagram,
  FaLinkedin,
  FaDribbble,
  FaBehance,
} from "react-icons/fa";
export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <h1>CONTACT US</h1>

        <div className="footer-columns">
          {/* Left Column */}
          <div className="footer-col">
            <h3>/ JOIN THE EVENT /</h3>
            <div className="input-group">
              <input type="text" placeholder="Enter Email Address" />
              <span>↗</span>
            </div>
          </div>

          {/* Middle Column */}
          <div className="footer-col">
            <h3>/ NAVIGATION /</h3>
            <ul>
              <li>
                <span>OVERVIEW</span>
                <span className="arrow">↗</span>
              </li>
              <li>
                <span>FEATURES</span>
                <span className="arrow">↗</span>
              </li>
              <li>
                <span>PRICING</span>
                <span className="arrow">↗</span>
              </li>
              <li>
                <span>CAREERS</span>
                <span className="arrow">↗</span>
              </li>
              <li>
                <span>HELP</span>
                <span className="arrow">↗</span>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="footer-col">
            <h3>/ CONTACT /</h3>

            <div className="contact-section">
              <h4>Address</h4>
              <p>ICA Miami's Sculpture Garden</p>
              <p>61 NE 41st Street, Miami, Florida</p>
            </div>

            <div className="contact-section">
              <h4>Event</h4>
              <p>Saturday, March 4, 2023</p>
              <p>Cocktails at 6 PM</p>
              <p>Dinner at 7 PM</p>
            </div>

            <div className="contact-section">
              <h4>Phone Number</h4>
              <p>(248) 823-3200</p>
            </div>
          </div>
        </div>
        <div className="floor">
          <ul>
            <li>Terms</li>
            <li>Privacy</li>
            <li>Cookies</li>
            <li>Legal</li>
            <li>Recall</li>
          </ul>
          {/* <p>&copy; 2025 Fahad Raza. All rights reserved.</p> */}
          <div className="circles">
            <div className="circle"><FaLinkedin size={18} /></div>
            <div className="circle"><FaInstagram size={18} /></div>
            <div className="circle"><FaDribbble size={18} /></div>
            <div className="circle"><FaBehance size={18} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
