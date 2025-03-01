import { Button, CircularProgress, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Dropdown from "../components/Dropdown";
import { Heading } from "../components/Heading";

const Quiz = () => {
  const [isauthenticated, setisauthenticated] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setisauthenticated(false);
      navigate("/login");
    } else {
      setisauthenticated(true);
    }
  }, [token, navigate]);

  const [quizData, setquizData] = useState(null);
  const [currQues, setcurrQues] = useState(0);
  const [isattempting, setisattempting] = useState(false);
  const [isQuizgen, setisQuizgen] = useState(false);
  const [isfinish, setisfinish] = useState(false);
  const [topic, settopic] = useState("");
  const [numques, setnumques] = useState("");
  const [difficulty, setdifficulty] = useState("");
  const [answer, setanswer] = useState([]);
  const [marks, setmarks] = useState(0);
  const [loading, setloading] = useState(false);


  const genratequiz = async () => {
    setloading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/genratequiz",
        { topic, numques, difficulty },
        { headers: { Authorization: token } }
      );
      setquizData(response.data.quiz);
      setisQuizgen(true);
    } catch (error) {
      if (error.response?.status === 400) alert(error.response.data.error);
    } finally {
      setloading(false);
    }
  };

  const calculatemarks = () => {
    let temp = 0;
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] === quizData.questions[i].answer) {
        temp++;
      }
    }
    setmarks(temp);
  };

  const handlequiz = () => {
    if (currQues < quizData.questions.length - 1) {
      setcurrQues(currQues + 1);
    } else {
      calculatemarks();
      setisfinish(true);
      setcurrQues(0);
      setisattempting(false);
      setisQuizgen(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-gray-800 shadow-md p-4 flex justify-between items-center fixed top-0 left-0 z-50">
        <Link to="/home">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-poppins">
            Quizzy
          </h1>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen flex flex-col items-center justify-center text-white px-4 pt-20">
        {isfinish ? (
          // Render only the finish section when isfinish is true
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col justify-center items-center text-center"
          >
            <Heading label={`Marks: ${marks}/${numques}`} />
            <button
              onClick={() => navigate("/home")}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-orange-500 hover:to-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg font-semibold text-white rounded-lg shadow-lg w-full"
            >
              Go Home
            </button>

            <div className="mt-6 w-full text-left space-y-4">
            {quizData.questions.map((question,index)=>{
              const isCorrect = answer[index] === question.answer;
              return(
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <h3>
                    {index+1}.{question.question};
                  </h3>

                  <div className="mt-2 space-y-2">
                    
                    {question.options.map((opt,optIndex)=>{
                      let optStyle = "bg-gray-600 text-white";

                      if(opt === question.answer){
                        optStyle = "bg-green-600 text-white";
                      }else if(opt === answer[index] && !isCorrect){
                        optStyle = "bg-red-600 text-white";
                      }

                      return (
                        <div
                          key={optIndex}
                          className={`p-2 rounded-md ${optStyle}`}
                        >
                          {opt}
                        </div>
                      );
                    })}
                  </div>
                  
                </div>
              )
            })}
            </div>

          </motion.div>
        ) : (
          // Render the quiz content when isfinish is false
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col justify-between items-center text-center"
          >
            {isQuizgen ? (
              isattempting ? (
                <>
                  <Heading label={`Question ${currQues + 1}`} />
                  <p className="text-lg font-medium p-4 bg-gray-700 rounded-lg shadow-md w-full text-gray-200 mt-5 mb-5">
                    {quizData.questions[currQues].question}
                  </p>
                  <Dropdown
                    value="Select your answer"
                    arr={quizData.questions[currQues].options}
                    change={(e) => setanswer([...answer, e.target.value])}
                  />
                  <button
                    onClick={handlequiz}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg font-semibold text-white rounded-lg shadow-lg w-full"
                  >
                    {currQues === quizData.questions.length - 1 ? "Finish Quiz" : "Next"}
                  </button>
                </>
              ) : (
                <>
                  <Heading label="Quiz Ready!" />
                  <button
                    onClick={() => setisattempting(true)}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-teal-600 hover:from-teal-500 hover:to-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg font-semibold text-white rounded-lg shadow-lg w-full"
                  >
                    Start Quiz
                  </button>
                </>
              )
            ) : (
              <>
                <Heading label="Create Quiz" />
                <input
                  type="text"
                  placeholder="Enter topic"
                  onChange={(e) => settopic(e.target.value)}
                  className="w-full mb-4 mt-4 p-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-300 transition"
                />

                <Dropdown
                  value="Number of questions"
                  arr={["5", "10"]}
                  change={(e) => setnumques(e.target.value)}
                  className="mb-1"
                />
                <Dropdown
                  value="Difficulty"
                  arr={["Easy", "Medium", "Hard"]}
                  change={(e) => setdifficulty(e.target.value)}
                  className="mb-2"
                />
                <button
                  onClick={genratequiz}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg font-semibold text-white rounded-lg shadow-lg w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <CircularProgress size={20} color="inherit" />
                      Generating...
                    </span>
                  ) : (
                    "Generate"
                  )}
                </button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Quiz;
