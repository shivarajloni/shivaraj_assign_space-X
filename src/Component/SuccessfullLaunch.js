import React from "react";
import { Card } from "react-bootstrap";
import "./SuccessfullLaunch.css";

function SuccessfullLaunch({ rocketdetail }) {
  const {
    flight_number,
    mission_name,
    mission_id,
    launch_year,
    launch_success,
    links,
    rocket,
  } = rocketdetail;
  const rocketImage = links.mission_patch_small;
  const land_success = rocket.first_stage.cores[0].land_success;

  return (
    <Card className="Rocket-detail">
      <div key={flight_number}>
        <div>
          <img
            src={rocketImage}
            alt="mission patch rocketImage not available on api"
            className="Rocket-image"
          />
        </div>
        <div className="Rocket-flight-number">
          {mission_name} #{flight_number}
        </div>
        <div className="Rocket-id-detail">
          Mission Ids:{" "}
          <ul>
            {" "}
            <li className="Launch-year">{mission_id}</li>
          </ul>
        </div>
        <div className="Launch-year">
          Launch Year:{" "}
          <span className="Launch-year">{launch_year}</span>
        </div>
        <div className="Launch-year">
          Successful Launch:{" "}
          <span className="Launch-year">
            {launch_success ? "true" : "false"}
          </span>
        </div>
        <div className="Launch-year">
          Successful Landing:{" "}
          <span className="Launch-year">
            {land_success ? "true" : "false"}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default SuccessfullLaunch;
