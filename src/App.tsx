import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import RouteList from './routes-nav/RoutesList';
import NavBar from './routes-nav/NavBar';
import UserContext from './auth/UserContext';
import JoblyApi from './api/api';
import Loading from './common/Loading';
import { IUser } from './interfaces';

//custom hook for logout?

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID: string = "jobly-token";

/** Jobly application.
 *
 * - applicationIds: for logged in users, this is a set of application Ids
 *   for applied jobs.
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app,
 *   infoLoaded: has user data been pulled from API?
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 *
 * App -> Routes
 */

function App() {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [isLoading, setIsLoading] = useState(true);

  /** Hydration: monitors for change to token state */
  useEffect(function getLocalToken(): void {
    async function getToken(): Promise<void> {
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
  async function signupUser(formData: IUser) {
    const token: any = await JoblyApi.signup(formData);
    setToken(token);
    localStorage.setItem('token', token);
  }

  /**Updates currentUser state */
  function updateCurrentUser(updatedUser: IUser) {
    setCurrentUser(updatedUser);
  }

  /**Handles logout, cleats currentUser, token state, and local storage. */
  function logout() {
    setCurrentUser({});
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
