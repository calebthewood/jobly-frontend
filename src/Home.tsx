import { useContext } from "react";
import UserContext from "./UserContext";
import { Link } from "react-router-dom";
import { IUser } from "./interfaces"

/** Renders home page with Jobly intro */

function Home() {
  const { currentUser } = useContext(UserContext);
  const name = currentUser ? currentUser.firstName : "";

  const loggedInMsg = (
    <p className="fw-light">Welcome, {name}</p>
  );

  const loggedOutMsg = (
    <div className="home-btn row justify-content-center">
      <Link to="/login" className="m-1 col col-6 col-sm-2 btn btn-outline-light shadow">Login</Link>
      <Link to="/signup" className="m-1 col col-6 col-sm-2 btn btn-outline-light shadow">Signup</Link>
    </div>
  );
  return (
    <div className="home-heading row align-items-center">
      <div className="col" >
        <h1 className="h1 fw-bold">Jobly</h1>
        <h5 className="h5 fw-light">All the jobs in one, convenient place.</h5>
        {currentUser ? loggedInMsg : loggedOutMsg}
      </div>
    </div>
  );
}

export default Home;