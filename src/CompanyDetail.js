import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import JobCard from "./JobCard";
import JoblyApi from "./api";

/** Skeleton! */
function CompanyDetail() {
  //http://localhost:3001/companies/ayala-buchanan


  const { handle } = useParams();

  const [company, setCompany] = useState(null);

  useEffect(function getCompanyFromApi() {
    async function getCompany() {
      const company = await JoblyApi.getCompany(handle);
      setCompany(company);
    }
    getCompany();
  }, []);

  if (!company) return <i>Loading</i>;

  return (


    <div className="row justify-content-center">
      < div mb-3 className="col-6">
        <h5>
          {company.name}
        </h5>
        <p>
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