import JoblyApi from '../api/api';
import { useState, useEffect } from "react";
import CompanyCard from './CompanyCard';
import SearchForm from '../common/SearchForm';
import Loading from '../common/Loading';
import { ICompany } from '../interfaces';

/** Manages a list of Companies
 *
 * state -> [{company}, {company}, ...]
 *
 * prop - none
 *
 * RouteList -> Route -> CompanyList
 */
function CompanyList() {
  const [companies, setCompanies] = useState<ICompany[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**Gets list of companies on mount */
  useEffect(function getCompaniesFromApi() {
    async function getCompanies() {
      const companies: ICompany[]  = await JoblyApi.getCompanies();
      setCompanies(companies);
      setIsLoading(false);
    }
    getCompanies();
  }, []);

  /**Handles Search, updates companies state */
  async function search(term: string) {
    setIsLoading(true);
    const companies: ICompany[] = await JoblyApi.searchCompany(term);
    setCompanies(companies);
    setIsLoading(false);
  }

  const notFound = <p data-testid="not-found" style={{ color: "white" }}>Companies not found.</p>;

  if (isLoading) return <Loading />

  return (
    <div className="container">
      <div data-testid="search">
        <SearchForm search={search} />
      </div>

      {companies.length ?
        <div id="companyList" data-testid="resolved">
          {companies.map( (company: ICompany) => <CompanyCard key={company.handle} company={company} />)}
        </div>
        : notFound}
    </div>
  );
}

export default CompanyList;
