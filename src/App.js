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

  async function updateCurrentUser(user){
    const newUser = await JoblyApi.getUser(user.username);
    setCurrentUser(newUser)
  }

  console.log("APP:   ",currentUser);

  return (
    <div className="App">
      <UserContext.Provider value={{currentUser, updateCurrentUser}}  >
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <RouteList/>
        </div>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;