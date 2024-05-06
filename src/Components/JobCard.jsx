import React, { useState } from "react";
import "./JobCard.css";
import Modal from "./Modal/Modal";

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
        
        <div className="logoContainer">
          <div>
            <img className="logo" src={logoUrl} alt="logo" />
          </div>
          <div className="basicInfo">
            <h4>{Company}</h4>
            <h4>{jobRole}</h4>
            <h4>{location}</h4>
          </div>
        </div>
        <p className="salary">
          Estimated Salary : {estimatedSalary} {salaryCurrencyCode}
        </p>
        <h3>About Role</h3>
        {/* <p>{jobDetailsFromCompany}</p> */}
        <div className="jobDetails">
        <p>{jobDetailsFromCompany.slice(0, maxChars)}</p>
        {jobDetailsFromCompany.length > maxChars && (
          <button onClick={toggleExpand} className="toggleButton">Show more</button>
        )}
        </div>
        {minExp === null ? <div className="experience"><h4>No Minumum Experience</h4></div> : null}
        {minExp && (
          <div className="experience">
            <h3>Minumum Experience</h3>
            <p>{minExp} years</p>
          </div>
        )}
        
        
        <div  className="apply">
          <a href={jdLink} target="_blank">Easy Apply</a>
        </div>
      </li>
     
    </>
  );
}

export default JobCard;
