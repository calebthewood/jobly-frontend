import { useContext } from "react";
import UserContext from "./UserContext";
import { Link } from "react-router-dom";

/** Renders home page with Jobly intro */

function Home() {
  const { currentUser } = useContext(UserContext);
  const homeStyle = { color: "white", textAlign: "center", height: "70vw"};
  const name = currentUser ? currentUser.firstName : "";

  const loggedInMsg = (
    <p>Quick, find a job, think of the economy, {name}</p>
  );

  const loggedOutMsg = (
    <div>
      <Link to="/login" className="btn btn-primary">Login</Link>
      <Link to="/signup" className="btn btn-primary">Signup</Link>
    </div>
  );
  return (
    <div className="row align-items-center" style={homeStyle}>
      <div className="col" >
        <h3>Jobly</h3>
        <h6>All the jobs in one, convenient place.</h6>
        {currentUser ? loggedInMsg : loggedOutMsg}
      </div>
    </div>
  );
}

export default Home;