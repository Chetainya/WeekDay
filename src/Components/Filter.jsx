import React, { useState } from "react";
import "./Filter.css";
import { useDispatch, useSelector } from "react-redux";
import { jobSliceActions } from "../Store/JobSlice";


// New data fetched after applying filters will be raw and no filters will be applied on such data
//Reset filters should be applied to get back the raw data


function Filter() {
  const [filter, setFilter] = useState({
    minExp: "",
    minJdSalary: "",
    companyName: "",
    location: "",
    jobRole: "",
    "remote/onsite": "",
  });
  let jobs = useSelector((state) => state.jobs.Jobs);
  let filters = useSelector(state => state.jobs.appliedFilters)
  // let offset = useSelector(state => state.limit)
  let dispatch = useDispatch();

  async function getData() {
    
    let response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 10,
          offset: 0,
        }),
      }
    );
    let data = await response.json();

    dispatch(jobSliceActions.clearJobs());
    dispatch(jobSliceActions.setJobs(data.jdList));
  }

  function changeHandeler(e) {
    
    dispatch(jobSliceActions.filtersApplied({filterType : e.target.id , value : e.target.value}))
    
    if (e.target.id === "minExp" || e.target.id === "minJdSalary") {
      setFilter((currFilter) => {
        return {
          ...currFilter,
          [e.target.id]: e.target.value,
        };
      });
      let filteredjobs = jobs.filter((job) => {
        return job[e.target.id] >= e.target.value;
      });
      console.log(filteredjobs)
      dispatch(jobSliceActions.applyFilter(filteredjobs));
    }

    if (e.target.id === "companyName" || e.target.id === "location") {
        console.log(filters);
      setFilter((currFilter) => {
        return {
          ...currFilter,
          [e.target.id]: e.target.value,
        };
      });
      if (e.target.value === "") {
        dispatch(jobSliceActions.clearJobs());
        dispatch(jobSliceActions.clearFilters());
        getData();
        return;
      }

      let filteredJobs = jobs.filter((job) => {
        const userSelected = e.target.value.toLowerCase();
        const apiValue = job[e.target.id].toLowerCase();
        
        return apiValue.includes(userSelected);
      });
      dispatch(jobSliceActions.applyFilter(filteredJobs));
    }

    if (e.target.id === "remote/on-site") {
      setFilter((currFilter) => {
        return {
          ...currFilter,
          [e.target.id]: e.target.value,
        };
      });
      let filteredJobs = jobs.filter((job) => {
        if (e.target.value === "remote") {
          return job.location.includes(e.target.value);
        } else {
          return job.location !== "remote";
        }
      });
      dispatch(jobSliceActions.applyFilter(filteredJobs));
    }

    if (e.target.id === "jobRole") {
      setFilter((currFilter) => {
        return {
          ...currFilter,
          [e.target.id]: e.target.value,
        };
      });
      let filteredJobs = jobs.filter((job) => job.jobRole === e.target.value);
      dispatch(jobSliceActions.applyFilter(filteredJobs));
    }
  }

  function resetHandeler() {
    getData();
    setFilter({
      minExp: "",
      minJdSalary: "",
      companyName: "",
      location: "",
      jobRole: "",
      "remote/onsite": "",
    });
    dispatch(jobSliceActions.clearFilters());
  }

  return (
    <div className="filterContainer">
      <div className="filter">
        {/* <label htmlFor="minExp">Minimum Experience</label> */}
        <select
          name="minExp"
          id="minExp"
          value={filter.minExp}
          className="filterInput"
          onChange={changeHandeler}
        >
          <option value="Experience" selected hidden>
            Experience
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div className="filter">
        {/* <label htmlFor="minExp">Minimum Experience</label> */}
        <input
          type="text"
          value={filter.companyName}
          onChange={changeHandeler}
          name="companyName"
          id="companyName"
          className="filterInput"
          placeholder="Search Company Name"
        ></input>
      </div>
      <div className="filter">
        {/* <label htmlFor="minExp">Minimum Experience</label> */}
        <input
          type="text"
          value={filter.location}
          onChange={changeHandeler}
          name="location"
          id="location"
          className="filterInput"
          placeholder="Location"
        ></input>
      </div>

      <div className="filter">
        {/* <label htmlFor="minExp">Minimum Experience</label> */}
        <select
          name="remote/on-site"
          value={filter["remote/onsite"]}
          id="remote/on-site"
          onChangeCapture={changeHandeler}
          className="filterInput"
          onChange={changeHandeler}
        >
          <option value="Experience" selected hidden>
            Remote/On-Site
          </option>
          <option value="remote">Remote</option>

          <option value="In-office">On-site</option>
        </select>
      </div>

      <div className="filter">
        {/* <label htmlFor="minExp">Minimum Experience</label> */}
        <select
          name="minJdSalary"
          value={filter.minJdSalary}
          id="minJdSalary"
          className="filterInput"
          onChange={changeHandeler}
        >
          <option value="Experience" selected hidden>
            Minimum Base Pay Salary
          </option>
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
        </select>
      </div>
      <div className="filter">
        {/* <label htmlFor="minExp">Minimum Experience</label> */}
        <select
          name="jobRole"
          value={filter.jobRole}
          id="jobRole"
          className="filterInput"
          onChange={changeHandeler}
        >
          <option value="Experience" selected hidden>
            Role
          </option>
          <option value="frontend">frontend</option>
          <option value="backend">backend</option>
          <option value="ios">Ios</option>
          <option value="android">Android</option>
        </select>
      </div>

      <div className="filter">
        {/* <label htmlFor="minExp">Minimum Experience</label> */}
        <button onClick={resetHandeler} className="reset">
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default Filter;
