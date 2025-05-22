import { BrowserRouter, Routes, Route } from "react-router-dom";
import React ,{useState} from "react";

import NavigationBar from "./components/Navbar/NavigationBar";
//Developer Components
import Developer from "./components/Developer/DeveloperLogin";
import DeveloperLayout from "./components/Developer/Sidebar/layoutDeveloper"; // Correct name
import DeveloperDashBoard from "./components/Developer/DeveloperPages/Dashboard";
import ProgressTasks from "./components/Developer/DeveloperPages//ProgressTasks";
import PendingTask from "./components/Developer/DeveloperPages/PendingTask";
import CompletedTasks from "./components/Developer/DeveloperPages/CompletedTasks";

// Admin Components
import Admin from "./components/Admin/AdminLogin"; 
import AdminLayout from "./components/Admin/Sidebar/layoutAdmin";
import AdminDashboard from "./components/Admin/AdminPage/adminDashboard"; // Correct name
import AdminPendingTask from "./components/Admin/AdminPage/AdminPending"; // Correct name
import AdminProgressTasks from "./components/Admin/AdminPage/AdminProgress"; // Correct name
import AdminCompletedTasks from "./components/Admin/AdminPage/AdminCompleted"; // Correct name
import AddDeveloper from "./components/Admin/AdminPage/AddDeveloper"; // Correct name
import AllDeveloper from "./components/Admin/AdminPage/AllDeveloper"; // Correct name
import AddTask from "./components/Admin/AdminPage/AddTasks"; // Correct name
import AllTasks from "./components/Admin/AdminPage/AllTasks"; // Correct name




// Admin Layout and Pages




function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <>
      <BrowserRouter> 
        <NavigationBar />

        <Routes>
          {/* Admin Routes  */}
           <Route path="/adminLogin" element={<Admin />} />
         <Route path='/admin' element={<AdminLayout />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/pending-tasks" element={<AdminPendingTask />} /> 
          <Route path="/admin/progress-tasks" element={<AdminProgressTasks tasks={tasks} />} />
          <Route path="/admin/completed-tasks" element={<AdminCompletedTasks tasks={tasks} />} />
          <Route path="/admin/add-developer" element={<AddDeveloper />} />
          <Route path="/admin/all-developers" element={<AllDeveloper />} />
          <Route path="/admin/add-task" element={<AddTask />} />
          <Route path="/admin/all-tasks" element={<AllTasks tasks={tasks} />} />
         

           
          {/* Developer Routes */}

       
          <Route path="/developerLogin" element={<Developer />} />
            <Route path=""element={<DeveloperLayout />}>
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
