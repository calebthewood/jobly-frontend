import JoblyApi from './api';
import React, { useState, useEffect } from "react";
import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm';
import Loading from './Loading';

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
  const [isLoading, setIsLoading] = useState(true);

  /**Gets list of companies on mount */
  useEffect(function getCompaniesFromApi() {
    async function getCompanies() {
      const companies = await JoblyApi.getCompanies();
      setCompanies(companies);
      setIsLoading(false);
    }
    getCompanies();
  }, []);

  /**Handles Search, updates companies state */
  async function search(term) {
    setIsLoading(true);
    const companies = await JoblyApi.searchCompany(term);
    setCompanies(companies);
    setIsLoading(false);
  }

  const notFound = <p style={{ color: "white" }}>Companies not found.</p>;



  if (isLoading) return <Loading />

  return (
    <div className="container">
      <div>
        <SearchForm search={search} />
      </div>

      {companies.length ?
        <div id="companyList">
          {companies.map(company => <CompanyCard key={company.handle} company={company} />)}
        </div>
        : notFound}
    </div>
  );
}

export default CompanyList;