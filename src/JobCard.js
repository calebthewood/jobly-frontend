

/** Renders JobCard */
function JobCard({ job }) {
  return (
    <div className="row justify-content-center">
      <div className="card mb-3 col-6">
        <h6>{job.title}</h6>
        <p>{job.companyName}</p>
        <div>
          <small>
            Salary: {job.salary || ""}
          </small>
        </div>
        <div>
          <small>
            Equity: {job.equity || ""}
          </small>
        </div>
      </div>
    </div>
  );
}

export default JobCard;