import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "../auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        username,
        password,
      });
      setToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded shadow-md">
        <h1 className="text-3xl mb-6 text-center">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-400 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-400 rounded"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
