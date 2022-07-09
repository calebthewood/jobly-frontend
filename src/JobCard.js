

/** Creates card for each Job
 *
 * prop - {job}
 *
 * state - none
 *
 * JobList -> JobCard
 */
function JobCard({ job }) {
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-xl-7">
        <div className="card shadow mb-4 col">
          <div className="card-body">
            <h6 className="card-title">{job.title}</h6>
            <p className="card-text fw-light">{job.companyName}</p>
            <div className="card-text fw-light">
              <small>
                Salary: {job.salary || ""}
              </small>
            </div>
            <div className="card-text fw-light">
              <small>
                Equity: {job.equity || ""}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;