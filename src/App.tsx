import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import Games from "./pages/Games";
import RandomMatch from "./pages/RandomMatch";
import WatchRoom from "./pages/WatchRoom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router basename="/blurchat">
      <nav className="bg-gray-800 p-4 text-white flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/chatroom">ChatRoom</Link>
        <Link to="/games">Games</Link>
        <Link to="/randommatch">Random Match</Link>
        <Link to="/watchroom">Watch Room</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/games" element={<Games />} />
        <Route path="/randommatch" element={<RandomMatch />} />
        <Route path="/watchroom" element={<WatchRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
