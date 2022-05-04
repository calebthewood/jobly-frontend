import { NavLink } from "react-router-dom";

// Need to pass in prop to jobs to make request to backend for jobs

function NavBar({getCompanies}) {
  return (
    <nav>
      <NavLink to="/">Jobly</NavLink>
      <span>
        <NavLink to="/companies" onClick={getCompanies}>Companies</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
      </span>
    </nav>
  )
}

export default NavBar;