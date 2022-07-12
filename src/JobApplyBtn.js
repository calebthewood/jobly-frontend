// import { useContext, useState } from "react";
// import UserContext from "./UserContext";


/** Button to Apply for Jobs
 * enabled if job not in users jobs list
 * disabled if job in users jobs list
 */
function JobApplyBtn({ applyToJob, jobId }) {
  // const [status, setActive] = useState(status)
  // const { currentUser } = useContext(UserContext);

  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick=""
      >Apply</button>
  );
}

export default JobApplyBtn;