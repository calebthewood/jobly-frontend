import JoblyApi from './api';
import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import SearchForm from './SearchForm';


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
  const [isLoading, setIsLoading] = useState(true)


  useEffect(function getJobsFromApi() {
    async function getJobs() {
      const jobs = await JoblyApi.getJobs();
      setJobs(jobs);
      setIsLoading(false);
    }
    getJobs();
  }, [])

  async function search(term) {
    setIsLoading(true)
    const jobs = await JoblyApi.searchJob(term)
    setJobs(jobs);
    setIsLoading(false)
  }

  const notFound = <p style={{color:"white"}}>Sorry, not found.</p>

  if (isLoading) return <i style={{color:"white"}}>Loading</i>

  return (
    <div className='container'>
      <SearchForm search={search}/>
      {jobs.length ?
        <div>
          {jobs.map( job => <JobCard key={job.id} job={job} />)}
       </div>
       : notFound }
    </div>
  )
}

export default JobList;