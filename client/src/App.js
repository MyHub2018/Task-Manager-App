import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddEditTask from "./pages/AddEditTask";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={<Dashboard />} />}
          />
          {/* Route for creating a new task */}
          <Route
            path="/task/new"
            element={<ProtectedRoute component={<AddEditTask />} />}
          />
          {/* Route for editing an existing task */}
          <Route
            path="/task/:id/edit"
            element={<ProtectedRoute component={<AddEditTask />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
