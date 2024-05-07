import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jobSliceActions } from "../Store/JobSlice";
import JobCard from "./JobCard";
import "./ListJobs.css";
import Store from "../Store/Store";

const limit = 10;
let offset = 0;

function ListJobs() {
  let jobs = useSelector((state) => state.jobs);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  let filterCategory = useSelector((state) => state.jobs.appliedFilters);
  console.log(filterCategory);

  function applyFilters(newData) {
    const state = Store.getState();

    let filterCategory = state.jobs.appliedFilters;

    if (filterCategory?.minExp) {
      let filteredJobs = newData.filter((job) => {
        return Number(job.minExp) >= Number(filterCategory.minExp);
      });
      newData = filteredJobs
      return filteredJobs;
    }
    if (filterCategory?.minJdSalary) {
      let filteredJobs = newData.filter((job) => {
        return Number(job.minJdSalary) >= Number(filterCategory.minJdSalary);
      });
      newData = filteredJobs
      return filteredJobs;
    }

    if (filterCategory?.companyName) {
      let filteredJobs = newData.filter((job) => {
        const userSelected = filterCategory.companyName.toLowerCase();
        const apiValue = job.companyName.toLowerCase();
        return apiValue.includes(userSelected);
      });
      newData = filteredJobs
      return filteredJobs;
    }
    if (filterCategory?.location) {
      let filteredJobs = newData.filter((job) => {
        return job.location.includes(filterCategory.location);
      });

      // dispatch(jobSliceActions.applyFilter(filteredJobs))
      newData = filteredJobs
      return filteredJobs;
    }
    if((filterCategory['remote/on-site'])){
      console.log(filterCategory['remote/on-site'])
      let filteredJobs = newData.filter((job) => {
        if(filterCategory['remote/on-site'] === 'remote'){
          console.log('remote')
          return job.location === 'remote'
        }else{
          return job.location !== 'remote'
        }
      });

      // dispatch(jobSliceActions.applyFilter(filteredJobs))
      newData = filteredJobs
      return filteredJobs;
    }
    if (filterCategory?.jobRole) {
      let filteredJobs = newData.filter(job => {
        return job.jobRole === filterCategory.jobRole
      })
      newData = filteredJobs
      return filteredJobs;
    } else {
      return newData;
    }
  }

  async function getJobs() {
    setLoading(true);
    let response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: limit,
          offset: offset,
        }),
      }
    );

    let data = await response.json();
    offset = offset + limit;

    let latestData = applyFilters(data.jdList);
    console.log(latestData);
    dispatch(jobSliceActions.setJobs(latestData));

    // dispatch(jobSliceActions.limit(offset));

    setLoading(false);
  }

  if (!jobs.Jobs) {
    return <h3>No Jobs Found</h3>;
  }

  const handleScroll = () => {
    if (
      // (scrollTop + clientHeight >= scrollHeight )
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 20
    ) {
      getJobs(); // Fetch more jobs when user reaches the bottom of the page
    }
  };

  useEffect(() => {
    getJobs();
    window.addEventListener("scroll", handleScroll); // Add scroll event listener

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Remove event listener on component unmount
      dispatch(jobSliceActions.clearJobs());
    };
  }, []);

  return (
    <>
      {console.log(jobs.Jobs)}
      <div className="ListContainer">
        <ul className="List">
          {jobs.Jobs.map((job) => (
            <JobCard
              key={Date.now() * Math.random()}
              jdLink={job.jdLink}
              salaryCurrencyCode={job.salaryCurrencyCode}
              minExp={job.minExp}
              jobRole={job.jobRole}
              jobDetailsFromCompany={job.jobDetailsFromCompany}
              maxJdSalary={job.maxJdSalary}
              minJdSalary={job.minJdSalary}
              location={job.location}
              Company={job.companyName}
              logoUrl={job.logoUrl}
            ></JobCard>
          ))}
        </ul>
      </div>
      {loading && <p>Loading</p>}
    </>
  );
}

export default ListJobs;
