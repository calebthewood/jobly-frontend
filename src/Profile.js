import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "./api";
import { useContext } from "react";
import UserContext from "./UserContext";

function Profile({token}) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName:currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email
  });

//review for uncontrolled comp.
  useEffect(function getUserFromApi() {

    async function getUser(token) {
      const user = await JoblyApi.getUser(token);

      setFormData(()=> user);
      setIsLoading(false);
    }
    console.log("Profile Token:     ", token)
    getUser(token);
  }, []);


  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const {user} = await JoblyApi.updateUser(formData);
      setMessage("Updated successfully");

      setFormData(() => user);
      navigate("/profile");

    } catch (err) {
      console.log("HandleSubmit ERROR")
      console.error(err)
      setMessage(err[0])
      setFormData(()=> formData)
    }
  }

  if (isLoading) return <i style={{ color: "white" }}>Loading</i>;

  return (
    <div className="row justify-content-center mt-3">
      <div className="card col-md-4 justify-content-center">
        <div className="card-body">
          <h2>Update Profile</h2>
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
                onChange={handleChange}
                disabled={true}>
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
            <button className="btn btn-primary">Update</button>
          </form>

          {message && <p className={message}>{message}</p>}

        </div>
      </div>
    </div>);
}

export default Profile;