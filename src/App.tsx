import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import Finish from "./components/Finish";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LearnList from "./components/LearnList";
import Test from "./components/Test";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/learnList" element={<LearnList />} />
        <Route path="/game" element={<Game />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
};

export default App;
