import { useContext, useState } from "react";
import UserContext from "./UserContext";
import JoblyApi from './api';

/** Creates card for each Job
 *
 * prop - {job}
 *
 * state - none
 *
 * JobList -> JobCard
 */
function JobCard({ job }) {
  const { currentUser } = useContext(UserContext);

  //determines whether this jobId is in the user's applications list.
  const active = () => {
    if (currentUser?.applications) {
      return currentUser.applications.includes(job.id);
    } else {
      return false;
    }
  };

  const [applied, setApplied] = useState(active());

  async function handleApply() {
    if (!applied) {
      await JoblyApi.applyToJob(job.id);
      setApplied(() => !applied);
    }
  }


  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-xl-7">
        <div className="card shadow mb-4 col">
          <div className="card-body">
            <h6 className="card-title">{job.title}</h6>
            <p className="card-text fw-light">{job.companyName}</p>

            <div className="row card-text fw-light">
              <div className="col">
                <small>
                  Salary: {job.salary || ""}
                </small>

                <div className="card-text fw-light">
                  <small>
                    Equity: {job.equity || ""}
                  </small>
                </div>
              </div>

              <div className="col align-self-end">
                <button
                  style={{ width: "90px" }}
                  type="button"
                  className="btn btn-danger float-end"
                  disabled={applied}
                  onClick={handleApply}>{applied ? "Applied" : "Apply"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
}

export default JobCard;