import
    logo from './logo.svg';
import './App.css';
import checkAuth from "./store/checkAuth";
function App() {
  return (
    <div className="App">
      <h1> Home Page</h1>
    </div>
  );
}

export default checkAuth(App);
