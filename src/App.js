import logo from './logo.svg';
import './App.css';
import { Home } from './Components/home';
import { AllRoutes } from './Routes/AllRoutes';

function App() {
  return (
    <div className="App">
      <Home />
      <AllRoutes />
    </div>
  );
}

export default App;
