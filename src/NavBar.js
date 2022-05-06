import { Link } from "react-router-dom";

/** Renders NavBar
 *
 * Props: currentUser, logout()
 *
 * Handles display based on currentUser state.
 */
function NavBar({currentUser, logout}) {

  const name = currentUser ? currentUser.username : "";

  const loggedInLinks =
    <div>
      <span>
          <Link to="/companies">Companies</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/" onClick={logout}>{name} Logout</Link>
      </span>
    </div>

  const loggedOutLinks =
    <span>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </span>

  return (
    <nav className="navbar navbar-light bg-light">
      <Link to="/" className="homeLink">Jobly</Link>
      <span className="float-end">
        {currentUser ? loggedInLinks : loggedOutLinks}
      </span>
    </nav>
  );
}

export default NavBar;