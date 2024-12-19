import './App.css';
import FamilyTreeApp from './FamilyTree';
import Wheel from './Wheel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<FamilyTreeApp />} />
        <Route path='/wheel' element={<Wheel />} />
      </Routes>
    </Router>
  );
}

export default App;
