import data from "./db-test.json";


function getCompanies(url) {

  // remove leading /
  const pathname = (new URL(url).pathname).slice(1);
  return Promise.resolve({ data: data[pathname]});
}

const JoblyApi = {
  getCompanies: jest.mock(getCompanies)
};

export default JoblyApi;