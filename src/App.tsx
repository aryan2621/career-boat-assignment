import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin";
import Form from "./pages/form";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./pages/home";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
