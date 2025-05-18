import { BrowserRouter, Routes, Route } from "react-router-dom";
import React ,{useState} from "react";

import NavigationBar from "./components/Navbar/NavigationBar";
//Login Components
import Developer from "./components/Developer/DeveloperLogin";
import Admin from "./components/Admin/AdminLogin"; 

// Developer Layout and Pages
import DeveloperLayout from "./components/Developer/Sidebar/layoutDeveloper"; // Correct name
import DeveloperDashBoard from "./components/Developer/DeveloperPages/Dashboard";
import ProgressTasks from "./components/Developer/DeveloperPages//ProgressTasks";
import CompletedTasks from "./components/Developer/DeveloperPages/CompletedTasks";
import PendingTask from "./components/Developer/DeveloperPages/PendingTask";

// Admin Layout and Pages




function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <>
      <BrowserRouter> 
        <NavigationBar />

        <Routes>
          <Route path="/developer" element={<Developer />} />
          <Route path="/admin" element={<Admin />} />

       
            <Route path="/"element={<DeveloperLayout />}>
            <Route path="/developerDashboard" element={<DeveloperDashBoard tasks={tasks} setTasks={setTasks} />} />
            <Route path="/Progress" element={<ProgressTasks tasks={tasks} />} />
            <Route path="/PendingTask" element={<PendingTask tasks={tasks}/>} />
            <Route path="/completed" element={<CompletedTasks tasks={tasks}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
