import JoblyApi from './api';
import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";


/** Manages list of Jobs
 *
 * state -> [{job}, {job}, ...]
 *
 * props -> none
 *
 * route list -> RouteList -> Route -> JobList
 */
function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(function getJobsFromApi() {
    async function getJobs() {
      const jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    getJobs();
  }, [])


  return (
    <div className='container'>
      {jobs.length ?
      <div>
        {jobs.map( job => <JobCard key={job.id} job={job} />)}
      </div>
       : <i>Loading</i> }
    </div>
  )
}

export default JobList;