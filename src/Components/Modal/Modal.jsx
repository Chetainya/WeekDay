import React from 'react'
import { createPortal } from 'react-dom';

import './Modal.css'


function Backdrop({onClose}){
    return (
        <div className="backdrop" onClick={onClose}></div>
    )
}

function Overlay({jdLink,
    minExp,
    salaryCurrencyCode,
    jobRole,
    Company,
    logoUrl,
    location,
    maxJdSalary,
    minJdSalary,
    jobDetailsFromCompany}){
        let estimatedSalary = null;
        if (minJdSalary && maxJdSalary) {
          estimatedSalary = `${minJdSalary}k - ${maxJdSalary}k `;
        } else if (maxJdSalary) {
          estimatedSalary = `${maxJdSalary}k`;
        } else if (minJdSalary) {
          estimatedSalary = `${minJdSalary}k`;
        }
    return (
        <div className="overlay">
            <div>
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
        <p>{jobDetailsFromCompany}</p>
        
        {minExp && (
          <div className="experience">
            <h3>Minumum Experience</h3>
            <p>{minExp} years</p>
          </div>
        )}
        <div  className="apply">
          <a href={jdLink} target="_blank">Easy Apply</a>
        </div>
      </div>
        </div>
    )
}



function Modal({onClose , jdLink,
    minExp,
    salaryCurrencyCode,
    jobRole,
    Company,
    logoUrl,
    location,
    maxJdSalary,
    minJdSalary,
    jobDetailsFromCompany}) {
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
  return (

    <>
      {createPortal(<Backdrop onClose={onClose} /> , document.getElementById('backdrop'))}
      {createPortal(<Overlay {...ModalProps} /> , document.getElementById('overlay'))}
    </>
  )
}






export default Modal
