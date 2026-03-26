import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import FindMatches from "./pages/FindMatches";
import MatchRequests from "./pages/MatchRequests";
import Chat from "./pages/Chat";
import SessionBooking from "./pages/SessionBooking";
import Ratings from "./pages/Ratings";
import AIChatbot from "./pages/AIChatbot";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("skillswap_token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="skillswap-app">
        <AppNavbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/matches/find" element={<PrivateRoute><FindMatches /></PrivateRoute>} />
            <Route path="/matches/requests" element={<PrivateRoute><MatchRequests /></PrivateRoute>} />
            <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
            <Route path="/ai-chat" element={<PrivateRoute><AIChatbot /></PrivateRoute>} />
            <Route path="/sessions" element={<PrivateRoute><SessionBooking /></PrivateRoute>} />
            <Route path="/ratings" element={<PrivateRoute><Ratings /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
