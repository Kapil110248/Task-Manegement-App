import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavigationBar from "./components/Navbar/NavigationBar";
import Home from "./components/Home/Home";

import { TaskProvider } from "./components/Context/TaskContext";

// Developer Components
import DeveloperProtectedRoute from "./components/Developer/Protected/DeveloperProtectedRoute";
import Developer from "./components/Developer/DeveloperLogin";
import DeveloperLayout from "./components/Developer/Sidebar/layoutDeveloper";
import DeveloperDashBoard from "./components/Developer/DeveloperPages/Dashboard";
import ProgressTasks from "./components/Developer/DeveloperPages/ProgressTasks";
import PendingTask from "./components/Developer/DeveloperPages/PendingTask";
import CompletedTasks from "./components/Developer/DeveloperPages/CompletedTasks";
import DeveloperProfile from "./components/Developer/DeveloperPages/DeveloperProfile";

// Admin Components
import AdminProtectedRoute from "./components/Admin/Protected/AdminProtectedRoute";
import Admin from "./components/Admin/AdminLogin";
import AdminLayout from "./components/Admin/Sidebar/layoutAdmin";
import AdminDashboard from "./components/Admin/AdminPage/adminDashboard";
import AdminPendingTask from "./components/Admin/AdminPage/AdminPending";
import AdminProgressTasks from "./components/Admin/AdminPage/AdminProgress";
import AdminCompletedTasks from "./components/Admin/AdminPage/AdminCompleted";
import AddDeveloper from "./components/Admin/AdminPage/AddDeveloper";
import AllDeveloper from "./components/Admin/AdminPage/AllDeveloper";
import AddTask from "./components/Admin/AdminPage/AddTasks";
import AllTasks from "./components/Admin/AdminPage/AllTasks";
import AdminProfile from "./components/Admin/AdminPage/AdminProfile";

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminLogin" element={<Admin />} />

          {/* ✅ Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="pending-tasks" element={<AdminPendingTask />} />
            <Route path="progress-tasks" element={<AdminProgressTasks />} />
            <Route path="completed-tasks" element={<AdminCompletedTasks />} />
            <Route path="add-developer" element={<AddDeveloper />} />
            <Route path="all-developers" element={<AllDeveloper />} />
            <Route path="add-task" element={<AddTask />} />
            <Route path="all-tasks" element={<AllTasks />} />
            <Route path="adminProfile" element={<AdminProfile />} />
          </Route>

          {/* ✅ Developer Routes */}
          <Route path="/developerLogin" element={<Developer />} />

          <Route
            path="/developer"
            element={
              <DeveloperProtectedRoute>
                <DeveloperLayout />
              </DeveloperProtectedRoute>
            }
          >
            <Route path="Dashboard" element={<DeveloperDashBoard />} />
            <Route path="Progress" element={<ProgressTasks />} />
            <Route path="completed" element={<CompletedTasks />} />
            <Route path="PendingTask" element={<PendingTask />} />
            <Route path="developerProfile" element={<DeveloperProfile />} />
          </Route>
        </Routes>
      </TaskProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
