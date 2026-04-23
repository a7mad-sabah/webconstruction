import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Loader from "./Components/Loader";
// aa
import Home from "./Pages/Home";
import Workers from "./Pages/Workers";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import About from "./Pages/About";
import NotFound from "./Pages/NotFound";
import Factories from "./Pages/Factories";
import Companyregister from "./Pages/Companyregister";
import Users from "./Pages/Users";

// 🔥 App Wrapper
function AppWrapper() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // هەر جار refresh → loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // ⏱️ 3 چرکە loader

    return () => clearTimeout(timer);
  }, []);

  // 🔥 Show Loader first
  if (loading) return <Loader />;

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/worker/:id" element={<WorkerProfile />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/companyregister" element={<Companyregister />} />

        {/* Other Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/factories" element={<Factories />} />
        <Route path="/Users" element={<Users />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

// 🔥 Main App
export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
