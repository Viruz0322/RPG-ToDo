import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/navBar";
import Home from "./pages/home";
import ErrorPage from "./pages/error-page";
import Warrior from "./components/warrior";
import Healer from "./components/healer";
import Scholar from "./components/scholar";

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <SideBar />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: 'warrior',
//         element: <Warrior />
//       },
//       {
//         path: 'healer',
//         element: <Healer />,
//       },
//       {
//         path: 'scholar',
//         element: <Scholar />,
//       },
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <div className="flex">
        <SideBar />
        <main className="w-4/5">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  </React.StrictMode>
);
