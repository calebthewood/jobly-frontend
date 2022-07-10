import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

/** Handles Signup Form
 * Props: signupUser()
 *
 * State: error, formData
 */
function Signup({ signupUser }) {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  /** Updates formData state on change */
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Submits new user data to API */
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await signupUser(formData);
      navigate("/");
    } catch (err) {
      console.log("SIGNUP ERROR:   ", err);
      setError(err);
    }
  }
  //TODO: render form using map()
  return (
    <div className="row justify-content-center mt-3">
      <div className="card col-10 col-md-6 col-xl-5 justify-content-center">
        <div className="card-body">
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="username"
                className="form-label">
                Username:</label>
              <input
                name="username"
                id="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}>
              </input>
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label">
                Password</label>
              <input
                name="password"
                id="password"
                type="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}>
              </input>
            </div>
            <div className="mb-3">
              <label
                htmlFor="firstName"
                className="form-label">
                First Name:</label>
              <input
                name="firstName"
                id="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}>
              </input>
            </div>
            <div className="mb-3">
              <label
                htmlFor="lastName"
                className="form-label">
                Last Name:</label>
              <input
                name="lastName"
                id="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}>
              </input>
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label">
                Email :</label>
              <input
                name="email"
                id="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}>
              </input>
            </div>
            <div className="row justify-content-around">
            <input type="submit" className="col btn btn-primary col-11 col-sm-4 m-1">Signup</input>
            <Link to="/" className="col btn btn-secondary col-11 col-sm-4 m-1">Cancel</Link>
            </div>
          </form>

          {error && <p className="alert alert-danger">{error}</p>}

        </div>
      </div>
    </div>);
}

export default Signup;