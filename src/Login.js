import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "./api";
import { useContext } from "react";
import UserContext from "./UserContext";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  //think about keeping user interactions in one place.
  const { updateCurrentUser } = useContext(UserContext);

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const res = await JoblyApi.login(formData);

    if (res.username) {
      updateCurrentUser(res);
      navigate("/companies");
    }
    setError(res);
  }


  return (
    <div className="row justify-content-center mt-3">
      <div className="card col-md-4 justify-content-center">
        <div className="card-body">
          <h2>Login</h2>
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
            <button className="btn btn-primary">Login</button>
          </form>

          {error && <p className="alert alert-danger">{error}</p>}

        </div>
      </div>
    </div>);
}

export default Login;