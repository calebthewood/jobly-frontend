import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";
import JoblyApi from "./api";
import Loading from "./Loading";
import { ICompany } from "./interfaces";

/** Company Detail:
 * state: company object
 *
 * renders Company Details with list of JobCards
 */
function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState<ICompany | null>(null);

  /**Gets company data with jobs from API */
  useEffect(function getCompanyFromApi() {
    async function getCompany(): Promise<void> {
      const company: ICompany = await JoblyApi.getCompany(handle!);
      setCompany(company);
    }
    getCompany();
  }, [handle]);

  if (!company) return <Loading />

  return (


    <div className="row justify-content-center">
      < div mb-3 className="col-6">
        <h5 style={{ color: "white", fontWeight:"bold"}}>
          {company.name}
        </h5>
        <p style={{ color: "white"}}>
          {company.description}
        </p>
      </div >
      <div className="container">
        {company.jobs.map(job => <JobCard job={job} />)}
      </div>
    </div >
  );
}

export default CompanyDetail;