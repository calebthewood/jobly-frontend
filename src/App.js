import logo from './logo.svg';
import './App.css';
import RouteList from './RoutesList';
import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';
import JoblyApi from './api';
import React, { useState } from "react";

function App() {
  const [companies, setCompanies] = useState([]);

  // Move this logic to company list
  async function getCompanies() {
    const companies = await JoblyApi.getCompanies();
    setCompanies(companies);
  }



  return (
    <div className="App">
      <BrowserRouter>
        <NavBar getCompanies={getCompanies}/>
        <div className="container">
          <RouteList companies={companies}/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
