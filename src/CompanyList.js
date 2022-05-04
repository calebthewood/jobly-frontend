import JoblyApi from './api';
import React, { useState, useEffect } from "react";
import CompanyCard from './CompanyCard';

/** Manages a list of Companies
 *
 * state -> [{company}, {company}, ...]
 *
 * prop - none
 *
 * RouteList -> Route -> CompanyList
 */

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(function getCompaniesFromApi() {
    async function getCompanies() {
      const companies = await JoblyApi.getCompanies();
      setCompanies(companies);
    }
    getCompanies();
  }, [])

  return (
    <div>
      {companies.length ? <div>
        {companies.map(company => <CompanyCard key={company.handle} company={company}/>)}
      </div> : <i>Loading</i>}
  </div>

  )
}

export default CompanyList;