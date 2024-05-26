
import './index.css'
import Sidebar from './components/Sidebar'
import EventsPage from './screens/EventsPage'
import LoginPage from './screens/LoginPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModifyPlan from './screens/ModifyPlan';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/MyEvents" element={<Sidebar/>} />
        <Route path="/Events" element={<EventsPage/>} />
        <Route path="/InfoPlanView/:id" element={<ModifyPlan/>} />
      </Routes>
    </Router>
  )
}

export default App
