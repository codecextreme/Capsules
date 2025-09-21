import React from "react";
import "./Stats.css";
import { FaThumbsUp, FaUsers, FaBuilding } from "react-icons/fa";
import CountUp from "../../Components/CountText/Count";

const Stats = () => {
  return (
    <div className="stats-container">
      <h2 className="stats-heading">TRUST THROUGH EFFICIENCY</h2>

      <div className="stats-line" />

      <div className="stats-row">
        <div className="stat-box">
          <div style={{ display: "flex", alignItems:'center', justifyContent:'center', gap:20 }}>
          <div className="stat-icon">
            <FaThumbsUp/>
          </div>
         
            <div style={{display:'flex'}}>
              <CountUp
                from={0.0}
                to={4.9}
                separator=","
                direction="up"
                duration={1}
                className="stats-number"
              />
              <h3>/</h3>
              <CountUp
                from={0.0}
                to={5}
                separator=","
                direction="up"
                duration={1}
                className="stats-number"
              />
              </div>
           
            </div>
            <p className="stat-label">Rating in TrustPilot</p>
          
        </div>

        <div className="stat-box">
          <div style={{display: "flex", alignItems:'center', justifyContent:'center', gap:20 }}>
          <div className="stat-icon">
            <FaUsers />
          </div>
       
            <div style={{ display: "flex" }}>
              <CountUp
                from={0.0}
                to={1.8}
                separator=","
                direction="up"
                duration={1}
                className="stats-number"
              />
              <h3>M+</h3>
              </div>
            </div>
            <p className="stat-label">Followers</p>
       
        </div>

    <div className="stat-box">
          <div style={{display: "flex", alignItems:'center', justifyContent:'center', gap:20 }}>
          <div className="stat-icon">
            <FaBuilding />
          </div>
       
            <div style={{ display: "flex" }}>
              <CountUp
                from={0.0}
                to={2.5}
                separator=","
                direction="up"
                duration={1}
                className="stats-number"
              />
              <h3>M+</h3>
              </div>
            </div>
            <p className="stat-label">Active Customers</p>
       
        </div>
      </div>

      <div className="stats-line" />
    </div>
  );
};

export default Stats;
