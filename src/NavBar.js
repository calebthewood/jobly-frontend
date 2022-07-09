import { NavLink, Link } from "react-router-dom";

/** Renders NavBar
 *
 * Props: currentUser, logout()
 *
 * Handles display based on currentUser state.
 */
function NavBar({currentUser, logout}) {
  const joblyStyle = {
    fontSize: "bigger",
    fontWeight: "bolder",
    padding: "0 1rem",

  }
  const name = currentUser ? currentUser.username : "";

  const loggedInLinks =
    <div>
      <span>
          <NavLink className="nav-link" to="/companies">Companies</NavLink>
          <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
          <NavLink className="nav-link" to="/profile">Profile</NavLink>
          <Link className="nav-link" to="/" onClick={logout}>{name} Logout</Link>
      </span>
    </div>

  const loggedOutLinks =
    <span>
      <NavLink className="nav-link" to="/login">Login</NavLink>
      <NavLink className="nav-link" to="/signup">Signup</NavLink>
    </span>

  return (
    <nav className="navbar navbar-light bg-light">
      <NavLink style={joblyStyle} className="nav-link fs-4" to="/" >Jobly</NavLink>
      <span className="float-end">
        {currentUser ? loggedInLinks : loggedOutLinks}
      </span>
    </nav>
  );
}

export default NavBar;