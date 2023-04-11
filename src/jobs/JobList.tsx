import JoblyApi from '../api/api';
import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import SearchForm from '../common/SearchForm';
import Loading from '../common/Loading';
import { IJob } from '../interfaces';


/** Manages list of Jobs
 *
 * state -> [{job}, {job}, ...]
 *
 * props -> none
 *
 * route list -> RouteList -> Route -> JobList
 */
function JobList() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /** Gets Jobs from API and updates jobs and loading state. */
  useEffect(function getJobsFromApi() {
    async function getJobs() {
      const jobs = await JoblyApi.getJobs();
      if (Array.isArray(jobs)) {
        setJobs(jobs);
        setIsLoading(false);
      }
    }
    getJobs();
  }, []);

  /** Handles search, and updates jobs and loading state. */
  async function search(term) {
    setIsLoading(true);
    const jobs = await JoblyApi.searchJob(term);
    setJobs(jobs);
    setIsLoading(false);
  }

  const notFound = <p style={{ color: "white" }}>Sorry, not found.</p>;

  if (isLoading) return <Loading />

  return (
    <div className='container'>
      <SearchForm search={search} />
      {jobs.length ?
        <div>
          {jobs.map(job => <JobCard key={job.id} job={job} />)}
        </div>
        : notFound}
    </div>
  );
}

export default JobList;