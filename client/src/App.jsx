import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import SideBar from "./components/navBar";

function App() {
  return (
    <Router>
      <div className="flex">
        <SideBar />
        <main className="w-4/5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
