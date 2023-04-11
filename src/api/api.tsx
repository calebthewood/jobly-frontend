import axios from "axios";
import jwt_decode from 'jwt-decode';
import {
  IUser,
  DecodedToken
} from "../interfaces";





//token from insomnia testing: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkZyb2RvIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUwNTYxMTI2fQ.K8_5JvLSQ3A9l_ZVINJT5Uc_FUikcirKEJ8SgZAjeFA
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_URL = "https://r25-jobly-backend.herokuapp.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


  static token: string | null = null;
  //This value was previously the value null. If i break j

  //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…5MDl9.tTFEeQpOwFGO2v0XMZCsuR84PUIvoKa9YYiIYIoP9MA'

  static async request(endpoint: string, data = {}, method: string = "get"): Promise<any> {
    const url: string = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      //optional operator ?. used to clean up a testing error. Not ideal solution.
      const response = await axios({ url, method, data, params, headers });
      return response?.data;
    } catch (err: any) {
      console.error("API Error:", err.response);
      let message: string = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */
  static async getCompany(handle: string): Promise<any> {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }


  /** Get all companies */
  static async getCompanies(): Promise<any> {
    let res = await this.request(`companies`);
    return res.companies;
  }

  /** Get all jobs */
  static async getJobs(): Promise<any> {
    let res = await this.request('jobs');
    return res.jobs;
  }

  /** Search Company List */
  static async searchCompany(term: string): Promise<any> {
    const data = { name: term };
    let res = await this.request("companies", data);
    return res.companies;
  }

  /** Search Job List */
  static async searchJob(term: string): Promise<any> {
    const data = { title: term };
    let res = await this.request("jobs", data);
    return res.jobs;
  }

  /**Login User
   * returns token or error.
   */
  static async getToken({ username, password }): Promise<any> {
    const data = { username, password };
    const res = await this.request("auth/token", data, "post");
    return res.token;
  }

  /** Registers a user */
  static async signup({ username, password, firstName, lastName, email }: IUser): Promise<any> {
    const data = { username, password, firstName, lastName, email };

    const res = await this.request("auth/register", data, "post");
    return res.token;
  }

  /** Applies to a job */
  static async applyToJob(jobId: string): Promise<any> {
    const { username }: DecodedToken = jwt_decode(this.token);
    const res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.data;
  }

  /** Retrieves user information */
  static async getUser(token: any) {
    const { username }: DecodedToken = jwt_decode(token);
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Updates a user's profile */
  static async updateUser(data: IUser) {
    const { username }: DecodedToken = jwt_decode(this.token);
    delete data.isAdmin;
    delete data.username;
    delete data.applications; // applications same as jobs

    const res = await this.request(`users/${username}`, data, "patch");

    return res;

  }

  //accepts token, getsUser object.
  //decode token, API getUser
}

export default JoblyApi;
