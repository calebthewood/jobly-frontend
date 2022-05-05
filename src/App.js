import { useState, createContext } from 'react';
import { BrowserRouter, UNSAFE_RouteContext } from 'react-router-dom';
import './App.css';
import bootstrap from 'bootstrap';
import RouteList from './RoutesList';
import NavBar from './NavBar';
import UserContext from './UserContext';
import JoblyApi from './api';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  async function updateCurrentUser(user) {
    console.log(JoblyApi.token, "jobly static token")
    const newUser = await JoblyApi.getUser(user.username);
    setCurrentUser(newUser)
  }

  function removeCurrentUser() {
    setCurrentUser(null);
    localStorage.removeItem("token");
  }

  console.log("APP:   ",currentUser);

  return (
    <div className="App">
      <UserContext.Provider value={{currentUser, updateCurrentUser, removeCurrentUser}}  >
      <BrowserRouter>
          <NavBar currentUser={currentUser}/>
        <div className="container">
            <RouteList currentUser={currentUser}/>
        </div>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;