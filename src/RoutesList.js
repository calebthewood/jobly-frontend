import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import Login from "./Login";
import Signup from "./SignUp";
import Profile from "./Profile";
import Logout from "./Logout";

function RouteList({currentUser}) {

  const loggedInRoutes =
    <>
      <Route path="/companies" element={<CompanyList />}/>
      <Route path="/companies/:handle" element={<CompanyDetail/>}/>
      <Route path="/jobs" element={<JobList />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/logout" element={<Logout />} />
      </>


  const loggedOutRoutes =
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
      </>

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      {currentUser ? loggedInRoutes : loggedOutRoutes}
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  )
}

export default RouteList;