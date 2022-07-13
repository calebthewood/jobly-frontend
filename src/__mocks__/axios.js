import data from "./db-test.json";


function get(url) {

  // remove leading /
  const pathname = (new URL(url).pathname).slice(1);
  return Promise.resolve({ data: data[pathname]});
}

const axios = {
  get: jest.fn(get)
};

export default axios;