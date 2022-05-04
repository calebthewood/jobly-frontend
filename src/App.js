import logo from './logo.svg';
import './App.css';
import bootstrap from 'bootstrap';
import RouteList from './RoutesList';
import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <RouteList/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
