import { MyButton } from "../components/MyButton";
import { Text } from "../components/text";
import { Heading } from "../components/Heading";
import { Password } from "../components/Password";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signinbutton = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          username: username,
          password: password,
        }
      );
      localStorage.setItem("token", "Bearer " + response.data.token);
      localStorage.setItem("username",username);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signin failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
       

      <nav className="w-full bg-gray-800 shadow-md p-4 flex justify-between items-center fixed top-0 left-0 z-50">
        <Link to="/home">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-poppins">
            Quizzy
          </h1>
        </Link>
      </nav>

      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
        <Heading label="Login" />
        <div className="space-y-4 mt-6">
          <Text label="Username" change={(e) => setUsername(e.target.value)} />
          <Password change={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mt-6">
          <MyButton
            label="Login"
            change={signinbutton}
            className="w-full bg-purple-600 hover:bg-purple-500 transition-all px-6 py-3 rounded-lg shadow-lg text-lg font-semibold"
          />
        </div>
        <div className="mt-4">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-cyan-400 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
