import { Link } from "react-router-dom";

/** Creates card for each company with a link
 *
 * prop - {company}
 *
 * state - none
 *
 * CompanyList -> Company Card
 */

function CompanyCard({ company }) {

  return (

    <Link to={`/companies/${company.handle}`}>
      <div className="row justify-content-center">
        <div className="card mb-3 col-6">
          <h6 className="card-header">
            {company.name}
            {company.logoUrl && <img src={`${company.logoUrl}`} alt={company.handle} className="float-end" />}
          </h6>
          <p className="card-body">{company.description}</p>
        </div>

      </div>
    </Link>
  );
}

export default CompanyCard;