import Home from "./Home";
import Movie from "./components/Movie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/ReactFlix" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
