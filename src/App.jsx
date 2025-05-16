import { BrowserRouter, Routes, Route } from "react-router-dom";
import React ,{useState} from "react";
import NavigationBar from "./components/Navbar/NavigationBar";
import Developer from "./components/Developer/DeveloperLogin";
import Admin from "./components/Admin/AdminLogin";
import Layout from "./components/Developer/Sidebar/layout"; // Correct name
import DeveloperDashBoard from "./components/Developer/DeveloperPages/Dashboard";
import ProgressTasks from "./components/Developer/DeveloperPages//ProgressTasks";
import CompletedTasks from "./components/Developer/DeveloperPages/CompletedTasks";
import PendingTask from "./components/Developer/DeveloperPages/PendingTask";

function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <>
      <BrowserRouter> 
        <NavigationBar />

        <Routes>
          <Route path="/developer" element={<Developer />} />
          <Route path="/admin" element={<Admin />} />

       
            <Route path="/"element={<Layout />}>
            <Route path="/developerDashboard" element={<DeveloperDashBoard tasks={tasks} setTasks={setTasks} />} />
            <Route path="/in-progress" element={<ProgressTasks tasks={tasks} />} />
            <Route path="/PendingTask" element={<PendingTask />} />
            <Route path="/completed" element={<CompletedTasks tasks={tasks}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
