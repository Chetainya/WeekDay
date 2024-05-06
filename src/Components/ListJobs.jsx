import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { jobSliceActions } from '../Store/JobSlice';
import JobCard from './JobCard';
import './ListJobs.css'


const limit = 10;
let offset = 0;

function ListJobs() {
    let jobs = useSelector(state => state.jobs)
    
    const dispatch = useDispatch();
    const [loading  , setLoading] = useState(false);
    
    

    async function getJobs(){

      setLoading(true)
      let response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON" , {
          method : 'POST',
          headers  : {
              "Content-Type" : "application/json"
          },
          body : JSON.stringify({
              
              "limit": limit,
              "offset": offset
             })
             
      })
  
      let data = await response.json();
      offset = offset + limit
      
      dispatch(jobSliceActions.setJobs(data.jdList));
      // dispatch(jobSliceActions.limit(offset));
      setLoading(false);
      
  
  }


    if(!jobs.Jobs){
      return <h3>No Jobs Found</h3>
    }


    const handleScroll = () => {
     
      if (
        
      // (scrollTop + clientHeight >= scrollHeight )
      window.scrollY + window.innerHeight  >= document.documentElement.scrollHeight - 20
      ) {
        console.log('fetch')
        getJobs(); // Fetch more jobs when user reaches the bottom of the page
      }
    };
  
    useEffect(() => {
      
      
    getJobs();
      window.addEventListener('scroll', handleScroll); // Add scroll event listener
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
         // Remove event listener on component unmount
         dispatch(jobSliceActions.clearJobs());
      };
    }, []);



    

  return (
    <>
    
    <div className='ListContainer'>
      <ul className='List'>
      {jobs.Jobs.map((job) => <JobCard key={job.jdUid} jdLink={job.jdLink} salaryCurrencyCode={job.salaryCurrencyCode} minExp={job.minExp} jobRole={job.jobRole} jobDetailsFromCompany={job.jobDetailsFromCompany} maxJdSalary={job.maxJdSalary} minJdSalary={job.minJdSalary} location={job.location} Company={job.companyName} logoUrl={job.logoUrl}></JobCard>)}
      </ul>
      
    </div>
    {loading && <p>Loading</p>}
    </>
  )
}

export default ListJobs
