import { useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Quiz from "./pages/Quiz"
import LandingPage from './pages/home';

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path = "/home" element = {<LandingPage/>}></Route>
        <Route path = "/signup" element = {<Signup/>}></Route>
        <Route path = "/login" element = {<Signin/>}></Route>
        <Route path = "/quiz" element = {<Quiz/>}></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
