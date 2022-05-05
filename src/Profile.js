import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "./api";

function Profile() {
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  // useEffect(function getUserFromApi() {
  //   async function getUser(username) {
  //     const user = await JoblyApi.getUser(username);
  //     console.log(user, "userrrr")
  //     console.log(username)
  //     setFormData(user);
  //   }
  //   getUser("testusername");
  //   setIsLoading(false);
  //   console.log(formData, "formData!")
  // }, [])


  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const res = await JoblyApi.updateUser({
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    });


    console.log(res, "res from update")
    if (res) {
      setMessage("Updated successfully")
      navigate("/profile");
    }
    console.log("ERROR:  ", res);
    setMessage(res);
  }

  if (isLoading) return <i style={{color:"white"}}>Loading</i>

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
                deactivated>
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

          {message && <p className={message.status}>{message}</p>}

        </div>
      </div>
    </div>);
}

export default Profile;