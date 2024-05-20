import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <div>
      <NoteState>
        <BrowserRouter>
          <Navigation />
          <Alert />
          {/* <Navbar /> */}
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />

              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </div>
  );
};

export default App;
