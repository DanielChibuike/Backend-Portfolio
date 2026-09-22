import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectRoute";


import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Project";
import About from "./components/About";
import Skills from "./components/skill";
import Experience from "./components/Experience";
import Lessons from "./components/lessons";
import Contact from "./components/Contact";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";

function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero/>
      <Projects/>
      <About/> 
      <Skills/>
      <Experience/>
      <Lessons/>
      <Contact/>
      <Footer/>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />


<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
