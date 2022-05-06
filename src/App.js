import { useState, createContext, useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import './App.css';
import bootstrap from 'bootstrap';
import RouteList from './RoutesList';
import NavBar from './NavBar';
import UserContext from './UserContext';
import JoblyApi from './api';

//custom hook for logout?

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(function getLocalToken() {
    async function getToken() {
      setToken(() => localStorage.getItem("token") || null);
      if (token) setCurrentUser(await JoblyApi.getUser(token))
    }
    getToken();
  }, [token])

  async function loginUser(formData) {
    const token = await JoblyApi.getToken(formData);

    setToken(token);
    localStorage.setItem('token', token);

    const newUser = await JoblyApi.getUser(token);
    setCurrentUser(() => newUser);
  }


  async function signupUser(formData) {
    const token = await JoblyApi.signup(formData);

    setToken(token);
    localStorage.setItem('token', token);

    const newUser = await JoblyApi.getUser(token);
    setCurrentUser(() => newUser);
  }


  function logout(){
    setCurrentUser(() =>null);
    setToken(() => null);
    localStorage.removeItem("token");
  }


  console.log("APP:   ", currentUser);

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
              token={token} />
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;