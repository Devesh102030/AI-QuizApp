import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [details, setdetails] = useState(null);
  const [user, setuser] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t) {
      navigate("/");
    }
    const fetchDetails = async () => {
      const username = localStorage.getItem('username');
      if (!username) return;
      try {
        const res = await axios.post('http://localhost:3000/api/v1/user/getdetails', { username });
        setuser(res.data.user);
        setdetails(res.data.details);
      } catch (error) {
        console.log("Error fetching details: ", error);
      }
    };
    fetchDetails();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <nav className="w-full bg-gray-800 shadow-md p-4 flex justify-between items-center fixed top-0 left-0 z-50">
        <Link to="/dashboard">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-poppins">
            Quizzy
          </h1>
        </Link>
        <Button
          variant="outlined"
          onClick={logout}
          className="!border-cyan-400 hover:!border-cyan-500 font-poppins hover:!bg-cyan-400 hover:!text-black transition-all px-6 py-2 rounded-lg"
        >
          Logout
        </Button>
      </nav>

      <div className="pt-32 px-5 max-w-screen-lg mx-auto">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-poppins mb-8">
          Welcome Back, {user?.firstName || "User"}!
        </h1>

        <div className="mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-poppins mb-4">
            Quick Stats
          </h2>
          <div className="text-2xl font-semibold text-cyan-400 mb-2">
            Total Quizzes Taken: {details?.quizesTaken || "0"}
          </div>
          <div className="text-2xl font-semibold text-cyan-400">
            Average Score: {details?.averageScore || "0"}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">Quiz History</h2>
          {details?.quizzes?.length > 0 ? (
            <div className="space-y-3">
              <div className="flex justify-between text-cyan-300 font-semibold border-b border-cyan-700 pb-2">
                <div className="w-1/5">Topic</div>
                <div className="w-1/5">Questions</div>
                <div className="w-1/5">Difficulty</div>
                <div className="w-1/5">Marks</div>
                <div className="w-1/5">Date</div>
              </div>
              {details.quizzes.map((item, index) => (
                <div key={index} className="flex justify-between bg-gray-800 p-4 rounded-lg shadow-md">
                  <div className="w-1/5">{item.topic}</div>
                  <div className="w-1/5">{item.numques} Qs</div>
                  <div className="w-1/5 capitalize">{item.difficulty}</div>
                  <div className="w-1/5">{item.marks}</div>
                  <div className="w-1/5">{item.date}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No quiz history available.</p>
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/quiz">
            <Button variant="outlined"
            className="bg-cyan-400 text-black hover:bg-cyan-500 transition-all px-10 py-6 rounded-2xl shadow-xl text-2xl"
            >
            Take Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
