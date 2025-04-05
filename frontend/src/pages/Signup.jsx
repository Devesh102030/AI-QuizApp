import { MyButton } from "../components/MyButton";
import { Text } from "../components/text";
import { Heading } from "../components/Heading";
import { useState } from "react";
import axios from "axios";
import { Password } from "../components/Password";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        firstName: firstname,
        lastName: lastname,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed", error);
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

      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
       
        <div className="text-center mb-6">
          <Heading label="Sign Up" />
        </div>
      
        <div className="flex flex-col items-center space-y-4">
          <Text label="First Name" change={(e) => setFirstname(e.target.value)} />
          <Text label="Last Name" change={(e) => setLastname(e.target.value)} />
          <Text label="Username" change={(e) => setUsername(e.target.value)} />
          <Password change={(e) => setPassword(e.target.value)} />
        </div>
        
        <div className="flex justify-center mt-6">
          <MyButton label="Sign Up" change={handleSignup} />
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-300">
            Already have an account?{" "}
            <a href="/login" className="text-cyan-400 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;


