import React, { useState } from "react";
import { Link } from "react-router-dom";

/** Handles Login
 * Props: loginUser()
 *
 * State: error obj, formData
 *
 * Renders Login Form and sets currentUser.
*/
function Login({ loginUser }) {

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  /** Updates formData state on each change */
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Handles login, calls login fn from App. */
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await loginUser(formData);
    } catch (err) {
      console.log("LOGIN ERROR:   ", err);
      setError(err);
    }
  }


  return (
    <div className="row justify-content-center mt-3">
      <div className="card col-10 col-md-6 col-xl-5 justify-content-center">
        <div className="card-body">
          <h2>Login</h2>
          <form>
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
            <div className="row justify-content-around">
              <button
                onClick={handleSubmit}
                className="col btn btn-primary col-11 col-sm-4 m-1">Login</button>
              <Link
                to="/"
                className="col btn btn-secondary col-11 col-sm-4 m-1">Cancel</Link>
            </div>
          </form>

          {error && <p className="alert alert-danger">{error}</p>}

        </div>
      </div>
    </div>);
}

export default Login;