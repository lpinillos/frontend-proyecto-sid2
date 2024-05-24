import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Sidebar from './components/Sidebar'
import EventsPage from './screens/EventsPage'
import LoginPage from './screens/LoginPage'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/MyEvents" element={<Sidebar/>} />
        <Route path="/Events" element={<EventsPage/>} />
      </Routes>
    </Router>
  )
}

export default App
