import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FamilyTreeApp from './FamilyTree'
import Wheel from './Wheel'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>  
        {/* <Route element={<Navbar />}> */}
          <Route path="/" element={<FamilyTreeApp />} />
          <Route path="/wheel" element={<Wheel />} />
        {/* </Route> */}
      </Routes>
    </Router>
  )
}

export default App
