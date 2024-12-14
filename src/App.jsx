import './App.css';
import FamilyTreeApp from './FamilyTree';
import Wheel from './Wheel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect, useRef } from 'react';
import audiodata1 from './assets/audio1.mp3';

function App() {
  const audioElement = new Audio(audiodata1);
  const hasUserInteractedWithPage = useRef(false);

  useEffect(() => {
    function detectClickAndPlay() {
      if (hasUserInteractedWithPage.current) return;
      hasUserInteractedWithPage.current = true;

      if (audioElement.paused) {
        audioElement.loop = true;
        audioElement.play();
        document.removeEventListener('click', detectClickAndPlay);
      }
    }

    document.addEventListener('click', detectClickAndPlay);

    return () => {
      document.removeEventListener('click', detectClickAndPlay);
    };
  }, []);

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
