import React from "react";
import "./Footer1.css";
import GaintText from "./GaintText";

export default function Footer() {
  return (
    <footer className="footer">
        <div>
      <div className="footer-left">
        Website made by—<a href="https://moyra.co" target="_blank" rel="noreferrer">Moyra.co</a>
      </div>

      <div className="footer-center">
        This website is using <a href="#">cookies</a>.
      </div>

      <div className="footer-right">
        All right reserved © {new Date().getFullYear()}
      </div>
      </div>
      <GaintText/>
    </footer>
  );
}
