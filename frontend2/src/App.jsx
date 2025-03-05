import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainApp } from "./front";
import AuthApp from "./auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Front />} />      {/* Home route */}
        <Route path="/auth" element={<AuthApp />} /> {/* Auth route */}
      </Routes>
    </Router>
  );
}

export default App;