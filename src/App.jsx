import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import AdminDashboard from "./assets/pages/AdminDashboard";
import Home from "./assets/pages/Home";
import PostDetail from "./assets/pages/PostDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivacyPolicy from "./assets/pages/PrivacyPolicy";
import Terms from "./assets/pages/Terms";
import Contact from "./assets/pages/Contact";
import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";
import StripTrailingSlashRedirect from "./assets/util/StripTrailingSlashRedirect";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-900  dark:text-white transition-colors duration-300 flex flex-col">
      <Router>
        <Header />

        <StripTrailingSlashRedirect />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/posts/:slug" element={<PostDetail />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
