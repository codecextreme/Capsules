import React from "react";
import "./Cap.css";

export default function CapsulesSection() {
  return (
    <div className="capsules-section">
      {/* Left Side */}
      <div className="capsules-left">
        <p>
          You can choose one of three <br />
          premium capsule houses in our <br />
          offer. Each of our capsules provides <br />
          the highest quality and meets the <br />
          standards adjusted to your needs. <br />
          Choose the one you like.
        </p>
      </div>

      {/* Right Side */}
      <div className="capsules-right">
        <p className="right-heading">
          All Capsules® houses—has built <br />
          based on the same rules:
        </p>
        <div className="capsules-tags">
          <span className="tag">Sustainable</span>
          <span className="tag tag1">Nature—Care</span>
          <span className="tag">Smart</span>
          <span className="tag tag1">Privacy</span>
          <span className="tag">Spacious</span>
          <span className="tag tag1">Glassed—in</span>
        </div>
      </div>
    </div>
  );
}
