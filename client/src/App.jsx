
import React from 'react'
import Dashboard from './Components/Dashboard/Dashboard'
import LoginPage from './Components/Login/LoginPage'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Register from './Components/Register/Register'
import ShowDashboard from './Components/Dashboard/ShowDashboard'

const App = () => {
  return (
    <Router >
    <Routes>
      <Route exact path="/" element={Register}></Route>
      <Route exact path="/Login" element={LoginPage}></Route>
      <Route exact path="/dashboard" element={ShowDashboard}></Route>
    </Routes>
  </Router>
  )
}

export default App