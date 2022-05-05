import { Link, NavLink } from "react-router-dom";

// Need to pass in prop to jobs to make request to backend for jobs

function NavBar({ getCompanies }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <Link to="/" className="homeLink">Jobly</Link>

      <span className="float-end">
        <span className="companiesLink">
          <Link to="/companies">Companies</Link>
        </span>
        <span className="jobsLink">
          <Link to="/jobs">Jobs</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </span>
      </span>

    </nav>
  );
}

export default NavBar;