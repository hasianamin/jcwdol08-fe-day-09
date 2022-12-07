import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Details from "./pages/detail";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:name" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
