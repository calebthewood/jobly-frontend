import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "./api";
import { useContext } from "react";
import UserContext from "./UserContext";



/**Handles Profile Update
 *
 * Props: updateCurrentUser()
 *
 * State: message, formData
 *
 * Loads user update form with current data.
 * Submit updates to API
 */
function Profile({ updateCurrentUser }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email
  });
  /**Updates formData state with changes to form. */
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /**
   * Submits formData to API
   * Updates currentUser
   * Updates formData
   * Displays error messages
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const { user } = await JoblyApi.updateUser(formData);
      setMessage("Updated successfully");
      setTimeout(() => setMessage(null), 5000);
      updateCurrentUser(user);
      setFormData(() => user);
      navigate("/profile");

    } catch (err) {
      console.error("HandleSubmit ERROR", err);
      setError(err[0]);
      setTimeout(() => setError(null), 5000);

      setFormData(() => formData);
    }
  }
  return (
    <div className="row justify-content-center mt-3">

      <div className="card col-10 col-md-8 col-xl-6 shadow justify-content-center">
        <div className="card-body">
          <h2 className="card-title">Update Profile</h2>
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
            <button type="submit" className="btn btn-primary me-3">Update</button>
            <button onClick={()=> window.location.reload(false)} className="btn btn-secondary">Cancel</button>
          </form>

          <div className="mt-3">
            {message && <p className="alert alert-success">{message}</p>}
            {error && <p className="alert alert-danger">{error}</p>}
          </div>
        </div>
      </div>
    </div>);
}

export default Profile;