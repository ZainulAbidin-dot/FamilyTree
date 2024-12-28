import './App.css';
import FamilyTreeApp from './FamilyTree';
import Orchard from './Orchard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';

import { FamilyTreeProvider } from './context/FamilyTreeContext';

function App() {
  return (
    <Router>
      <Navbar />
      <FamilyTreeProvider>
        <Routes>
          {/* <Route element={<FamilyTreeProvider />}> */}
          <Route path='/' element={<FamilyTreeApp />} />
          <Route path='/orchard' element={<Orchard />} />
          {/* </Route> */}
        </Routes>
      </FamilyTreeProvider>
    </Router>
  );
}

export default App;
