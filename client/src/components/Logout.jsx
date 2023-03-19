import { useNavigate } from "react-router-dom";
import { removeToken } from "../auth";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
