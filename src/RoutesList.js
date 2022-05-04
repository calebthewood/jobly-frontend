import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";

// Will need to pass in props for Company Detail and JobList (data from backend)
function RouteList({companies}) {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/companies" element={<CompanyList />}/>
      <Route path="/companies/:handle" element={<CompanyDetail/>}/>
      <Route path="/jobs" element={<JobList/>}/>
    </Routes>
  )
}

export default RouteList;