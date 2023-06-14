import Login from "./login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./signup/Signup";
import Home from "./home/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
