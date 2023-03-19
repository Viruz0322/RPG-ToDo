import { createRoot } from 'react-dom/client';
import "./main.css";

import App from "./App.jsx"; // Import the App component

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <React.StrictMode>
    <Router>
      <div className="flex">
        <SideBar />
        <main className="w-4/5 ">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  </React.StrictMode>
);

export default App;