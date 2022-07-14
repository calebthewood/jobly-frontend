import data from "./db-test.json";

const axios = jest.fn().mockResolvedValue({ data: data })


export default axios