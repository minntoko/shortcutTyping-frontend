import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/layouts/Home";
import Game from "./components/layouts/Game";
import Finish from "./components/layouts/Finish";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/finish" element={<Finish />} />
      </Routes>
    </>
  );
};

export default App;
