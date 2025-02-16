import Register from "../Register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Register />} />
      </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
