import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "./api";
import { useContext } from "react";
import UserContext from "./UserContext";

function Signup() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  const {updateCurrentUser } = useContext(UserContext);


  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const res = await JoblyApi.signup(formData);

    if (res.username) {
      updateCurrentUser(res)
      navigate("/companies");
    }
    setError(res);
  }


  return (
    <div className="row justify-content-center mt-3">
      <div className="card col-md-4 justify-content-center">
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
            <button className="btn btn-primary">Signup</button>
          </form>

          {error && <p className="alert alert-danger">{error}</p>}

        </div>
      </div>
    </div>);
}

export default Signup;