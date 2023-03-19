import { createRoot } from 'react-dom/client';
import "./main.css";

import App from "./App.jsx"; // Import the App component

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;