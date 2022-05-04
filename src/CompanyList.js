function CompanyList({ companies }) {
  // useEffect to make API request to companies
  // move logic from App to here!
  return (
    <div>
      {companies.length ? <div>
        {companies.map(company => <p>{company.name}</p>)}
      </div> : <i>Loading</i>}
  </div>

  )
}

export default CompanyList;