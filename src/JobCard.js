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

  const active = () => {
    if (currentUser?.jobs) {
      return currentUser.jobs.includes(job.id)
    } else {
      return false;
    }
  }

  const [applied, setApplied] = useState(active);


  async function handleApply() {
    if (!applied) {
      await JoblyApi.applyToJob(job.id);
      setApplied(() => !applied);
    }
  }

  const applyBtn = <button
    style={{ width: "100px" }}
    type="button"
    className="btn btn-danger"
    onClick={handleApply}>Apply</button>;

  const unApplyBtn = <button
    style={{ width: "100px" }}
    type="button"
    className="btn btn-danger"
    onClick={handleApply}
    disabled>Applied</button>;

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-xl-7">
        <div className="card shadow mb-4 col">
          <div className="card-body">
            <h6 className="card-title">{job.title}</h6>
            <p className="card-text fw-light">{job.companyName}</p>

            <div className="row justify-content-between card-text fw-light">
              <div className="col col-9">
                <small>
                  Salary: {job.salary || ""}
                </small>

                <div className="card-text fw-light">
                  <small>
                    Equity: {job.equity || ""}
                  </small>
                </div>
              </div>

              <div className="col-3">
                { applied ? unApplyBtn : applyBtn}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
}

export default JobCard;