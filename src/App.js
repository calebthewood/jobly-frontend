import { useState, createContext } from 'react';
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
  const [token, setToken] = useState(null);


  //login (username, password)
    /*
//login fn
    1. sends JoblyAPI req to /auth/token (username,pswd)
    2. set local storage token (token, from resp)
    3. set state token (token, from resp)

//API fn
    4. set JoblyAPI token (token, in resp)
    5. decode token (token, in resp)
    6. Jobly get user request (username from decoded token)
    returns UserObj

/back in login fn
    7. set currentUser in context (user object from resp)

    8. navigate to "/"

    */


  async function loginUser(formData) {
    const token = await JoblyApi.getToken(formData);

    setToken(token);
    localStorage.setItem('token', token);

    const newUser = await JoblyApi.getUser(token);
    setCurrentUser(newUser);
  }


  async function signupUser(formData) {
    const token = await JoblyApi.signup(formData);

    setToken(token);
    localStorage.setItem('token', token);

    const newUser = await JoblyApi.getUser(token);
    setCurrentUser(newUser);
  }


  function logout(){
    setCurrentUser(()=>null);
    setToken(()=> null);
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
              signupUser={signupUser}/>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;