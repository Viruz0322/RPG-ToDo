import { createRoot } from 'react-dom/client';
import "./main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import SideBar from './components/navBar';
import Home from './pages/home';
import Login from './components/Login';
import Signup from './components/Signup';

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <React.StrictMode>
    <Router>
      <div className="flex">
        <SideBar />
        <main className="w-4/5 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  </React.StrictMode>
);

export default App;