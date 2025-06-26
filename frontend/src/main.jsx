import React from 'react'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { TaskProvider } from './components//Context/TaskContext.jsx';
import { DeveloperProvider } from './components/Context/DeveloperContext.jsx';
import { UserProvider } from './components/Context/UserContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    <UserProvider>
    <TaskProvider>
      <DeveloperProvider>
      <App />
      </DeveloperProvider>
    </TaskProvider>
    </UserProvider>
  </React.StrictMode>
)
