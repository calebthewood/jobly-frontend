import { Link } from "react-router-dom";

/** Creates card for each company with a link
 *
 * prop - {company}
 *
 * state - none
 *
 * CompanyList -> CompanyCard
 */

function CompanyCard({ company }) {

  return (
    <Link to={`/companies/${company.handle}`}>
      <div className="row justify-content-center">

        <div className="card shadow mb-4">
          <div className="card-body">
            <h6 className="card-title">
              {company.name}
              {company.logoUrl &&
                <img
                  src={`${company.logoUrl}`}
                  alt={company.handle}
                  className="float-end"
                  style={{ height: "2rem" }} />}
            </h6>
            <p className="card-text fw-light">{company.description}</p>
          </div>
        </div>

      </div>
    </Link>
  );
}

export default CompanyCard;