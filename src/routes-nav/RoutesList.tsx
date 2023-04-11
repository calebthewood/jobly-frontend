import { Routes, Route, Navigate } from "react-router-dom";
import "./routes-nav.css";
import Home from "../homepage/Home";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import Login from "../auth/Login";
import Signup from "../auth/SignUp";
import Profile from "../profiles/Profile";

/**Renders available routes based on currentUser state. */
function RouteList({ currentUser, loginUser, signupUser, updateCurrentUser, token }) {

  const loggedInRoutes =
    <>
      <Route path="/companies" element={<CompanyList />} />
      <Route path="/companies/:handle" element={<CompanyDetail />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/profile" element={<Profile updateCurrentUser={updateCurrentUser}/>} />
    </>;


  const loggedOutRoutes =
    <>
      <Route path="/login" element={<Login loginUser={loginUser} />} />
      <Route path="/signup" element={<Signup signupUser={signupUser} />} />
    </>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {currentUser ? loggedInRoutes : loggedOutRoutes}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RouteList;