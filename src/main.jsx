import React from 'react'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { TaskProvider } from './components/Admin/Context/TaskContext.jsx';
import { DeveloperProvider } from './components/Admin/Context/DeveloperContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    <TaskProvider>
      <DeveloperProvider>
      <App />
      </DeveloperProvider>
    </TaskProvider>
  </React.StrictMode>
)
