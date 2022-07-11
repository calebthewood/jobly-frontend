import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RouteList from './RoutesList';
import NavBar from './NavBar';
import UserContext from './UserContext';
import JoblyApi from './api';
import Loading from './Loading';

//custom hook for logout?

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  /** Hydration: monitors for change to token state */
  useEffect(function getLocalToken() {
    async function getToken() {
      JoblyApi.token = token;
      if (token) {
        setCurrentUser(await JoblyApi.getUser(token));
      }
      setIsLoading(false);
    }
    getToken();
  }, [token]);


  /**Handles login, sets token state and local storage */
  async function loginUser(formData) {
    const token = await JoblyApi.getToken(formData);
    setToken(token);
    localStorage.setItem('token', token);
  }

  /**Handles signup, sets token state and local storage */
  async function signupUser(formData) {
    const token = await JoblyApi.signup(formData);
    setToken(token);
    localStorage.setItem('token', token);
  }

  /**Updates currentUser state */
  function updateCurrentUser(updatedUser) {
    setCurrentUser(updatedUser);
  }

  /**Handles logout, cleats currentUser, token state, and local storage. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }


  if (isLoading) return <Loading />;

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser }}  >
        <BrowserRouter>
          <NavBar
            currentUser={currentUser}
            logout={logout} />
          <div className="container">
            <RouteList
              currentUser={currentUser}
              loginUser={loginUser}
              signupUser={signupUser}
              updateCurrentUser={updateCurrentUser}
              token={token} />
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;