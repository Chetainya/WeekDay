import React, { useState } from "react";
import "./JobCard.css";
import Modal from "./Modal/Modal";
import TimeImage from "../assets/hourglass-with-sand-middle-word-sand-it_123827-23414.png";

const maxChars = 300;
function JobCard({
  jdLink,
  minExp,
  salaryCurrencyCode,
  jobRole,
  Company,
  logoUrl,
  location,
  maxJdSalary,
  minJdSalary,
  jobDetailsFromCompany,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  let ModalProps = {
    jdLink,
    minExp,
    salaryCurrencyCode,
    jobRole,
    Company,
    logoUrl,
    location,
    maxJdSalary,
    minJdSalary,
    jobDetailsFromCompany,
  };

  const toggleExpand = () => {
    setModalIsOpen(true);
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  let estimatedSalary = null;
  if (minJdSalary && maxJdSalary) {
    estimatedSalary = `${minJdSalary}k - ${maxJdSalary}k `;
  } else if (maxJdSalary) {
    estimatedSalary = `${maxJdSalary}k`;
  } else if (minJdSalary) {
    estimatedSalary = `${minJdSalary}k`;
  }

  return (
    <>
      {modalIsOpen && <Modal onClose={closeModal} {...ModalProps} />}
      <li className={`listItemContainer`}>
        <div className="postingDetails">
            
          <img className="TimeImage" src={TimeImage} alt="Time" />
          <p >Posted 20 days ago</p>
        </div>

        <div className="logoContainer">
          <div>
            <img className="logo" src={logoUrl} alt="logo" />
          </div>
          <div className="basicInfo">
            <h4 className="companyText">{Company}</h4>
            <h4>{jobRole.charAt(0).toUpperCase() + jobRole.slice(1)}</h4>
            <h4 className="location">
              {location.charAt(0).toUpperCase() + location.slice(1)}
            </h4>
          </div>
        </div>
        <p className="salary">
          Estimated Salary : {estimatedSalary} {salaryCurrencyCode}
        </p>
        <h3 className="bold">About Role</h3>
        {/* <p>{jobDetailsFromCompany}</p> */}
        <div className="jobDetails">
          <p>{jobDetailsFromCompany.slice(0, maxChars)}</p>

          <div className="fade-effect"></div>

          {jobDetailsFromCompany.length > maxChars && (
            <button onClick={toggleExpand} className="toggleButton">
              Show more
            </button>
          )}
        </div>

        {minExp === null ? (
          <div className="experience">
            <h4>No Minumum Experience</h4>
            <p style={{ visibility: "hidden" }}>0</p>
          </div>
        ) : null}
        {minExp && (
          <div className="experience">
            <h3>Minumum Experience</h3>
            <p>{minExp} years</p>
          </div>
        )}

        <div className="apply">
          <a href={jdLink} target="_blank">
            Easy Apply
          </a>
        </div>
      </li>
    </>
  );
}

export default JobCard;
