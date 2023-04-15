import { useState } from "react";
import _ from "lodash";

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */
function SearchForm({ search }) {

  const [term, setTerm] = useState("");
  const debouncedSearch = _.debounce(() => search(term), 500);

  /** Update form fields */
  function handleChange(evt) {
    setTerm(evt.target.value);
    debouncedSearch();
  }

  /** Tell parent to filter */
  function handleSubmit(evt) {
    evt.preventDefault();
    search(term);
  }

  return (
    <div className="row justify-content-center my-3">
      <form onSubmit={handleSubmit} className="col-10 col-md-8 col-xl-6">
        <div className="input-group mb-3 mt-3">
          <input
            className="form-control"
            name="searchTerm"
            value={term}
            onChange={handleChange}
            placeholder="Enter search term..."
          />
          <button className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
