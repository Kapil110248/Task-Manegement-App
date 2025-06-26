import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import NavigationBar from "./components/Navbar/NavigationBar";

// Developer Components
import DeveloperProtectedRoute from "./components/Developer/Protected/DeveloperProtectedRoute";
import Developer from "./components/Developer/DeveloperLogin";
import DeveloperLayout from "./components/Developer/Sidebar/layoutDeveloper";
import DeveloperDashBoard from "./components/Developer/DeveloperPages/Dashboard";
import ProgressTasks from "./components/Developer/DeveloperPages/ProgressTasks";
import PendingTask from "./components/Developer/DeveloperPages/PendingTask";
import CompletedTasks from "./components/Developer/DeveloperPages/CompletedTasks";

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

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <BrowserRouter>
      <NavigationBar />

      <Routes>
        {/* Admin Login (no protection) */}
        <Route path="/adminLogin" element={<Admin />} />

        {/* ✅ Protected Admin Routes */}
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
          <Route path="progress-tasks" element={<AdminProgressTasks tasks={tasks} />} />
          <Route path="completed-tasks" element={<AdminCompletedTasks tasks={tasks} />} />
          <Route path="add-developer" element={<AddDeveloper />} />
          <Route path="all-developers" element={<AllDeveloper />} />
          <Route path="add-task" element={<AddTask />} />
          <Route path="all-tasks" element={<AllTasks tasks={tasks} />} />
        </Route>

        {/* ✅ Developer Login */}
        <Route path="/developerLogin" element={<Developer />} />

        {/* ✅ Developer Protected Layout & Routes */}
        <Route path="/" element={
  <DeveloperProtectedRoute>
    <DeveloperLayout />
  </DeveloperProtectedRoute>
}>
  <Route path="developerDashboard" element={<DeveloperDashBoard tasks={tasks} setTasks={setTasks} />} />
  <Route path="Progress" element={<ProgressTasks tasks={tasks} />} />
  <Route path="completed" element={<CompletedTasks tasks={tasks} />} />
  <Route path="PendingTask" element={<PendingTask tasks={tasks} />} />
</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
