import { Link } from "react-router-dom";

// Need to pass in prop to jobs to make request to backend for jobs

function NavBar({getCompanies}) {
  return (
    <nav>
      <Link to="/">Jobly</Link>
      <span>
        <Link to="/companies" onClick={getCompanies}>Companies</Link>
        <Link to="/jobs">Jobs</Link>
      </span>
    </nav>
  )
}

export default NavBar;