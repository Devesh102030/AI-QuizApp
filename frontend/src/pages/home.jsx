import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import Lottie from "lottie-react"; // For animated graphics
import quizAnimation from "../assets/quiz-animation.json"; // Example Lottie animation
import { useState } from "react";


const LandingPage = () => {

  const [isLogin,setisLogin] = useState(false);
  const navigate = useNavigate();

  const check = ()=>{
    console.log(1);
    const t = localStorage.getItem('token');
    if(t){
      navigate('/quiz');
      setisLogin(true);
    }else{
      navigate('/signin');
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen flex flex-col justify-between overflow-hidden text-white">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 shadow-md p-4 flex justify-between items-center fixed top-0 left-0 z-50">
        <Link to="/home">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-poppins">
            Quizzy
          </h1>
        </Link>
        <div className="flex space-x-6">
          <Link to="/login">
            <Button variant="outlined"
  className="border-cyan-400 hover:border-cyan-500 font-poppins hover:bg-cyan-400 hover:text-black transition-all px-6 py-2 rounded-lg">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outlined" className="bg-purple-500 text-white hover:bg-purple-600 transition-all px-6 py-2 rounded-lg shadow-lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col items-center justify-center text-center px-6 mt-16"
      >
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-cyan-400 mb-6 mt-6">
            Unleash Your Knowledge with <span className="text-purple-400">AI-Powered Quizzes!</span>
          </h1>
          <p className="text-lg text-gray-300 mt-4">
            Create personalized quizzes on any topic with the power of AI. Learn,
            challenge, and improve—all in one place!
          </p>
          <div className="mt-8">   
            <Button onClick={check} variant="outlined" className="bg-cyan-400 text-black hover:bg-cyan-500 transition-all px-6 py-10 rounded-lg shadow-lg text-lg">
              Get Started
            </Button>  
          </div>
        </div>
        <div className="mt-12 w-full max-w-2xl">
          <Lottie animationData={quizAnimation} loop={true} />
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="mt-16 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">
          Why Choose Quizzy?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "AI-Powered Quizzes",
              desc: "Generate unique quiz questions instantly.",
              icon: "🧠",
            },
            {
              title: "Customizable Difficulty",
              desc: "Choose the level that matches your skills.",
              icon: "🎯",
            },
            {
              title: "Instant Feedback",
              desc: "Get detailed insights and explanations.",
              icon: "📊",
            },
            {
              title: "Interactive & Engaging",
              desc: "Challenge yourself and track progress.",
              icon: "🏆",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-gray-800 shadow-lg rounded-xl text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-purple-400">
                {feature.title}
              </h3>
              <p className="text-gray-300 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 py-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Start your AI-powered quiz journey today!
        </h2>
        <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
          Join thousands of learners who are already improving their knowledge with Quizzy. Sign up now and get started in seconds!
        </p>
        <div className="mt-6 flex justify-center space-x-4">
        <Link to="/signup">
            <Button variant="contained">
              Sign Up
            </Button>
          </Link>
          <Link to="/login" >
            <Button variant="contained">
              Login
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white text-center p-4">
        &copy; {new Date().getFullYear()} Quizzy. All Rights Reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
