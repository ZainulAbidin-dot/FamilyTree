import './App.css';
import FamilyTreeApp from './FamilyTree';
import Wheel from './Wheel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect, useRef, useState } from 'react';
import audiodata1 from './assets/audio1.mp3';

function App() {
  const audioElement = new Audio(audiodata1);
  const hasUserInteractedWithPage = useRef(false);
  const [music, setMusic] = useState(true);

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
  
  // Update audio playback based on `music` state
  useEffect(() => {
      if (music) {
        // audioElement.current.loop = true;
        if (audioElement.paused) {
          audioElement.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        }
      } else {
        console.log("first")
        audioElement.pause();
        // audioElement.current.currentTime = 0; // Optional: reset to the start
      }
  }, [music]);

  return (
    <Router>
      <Navbar music={music} setMusic={setMusic} />
      <Routes>
        <Route path='/' element={<FamilyTreeApp />} />
        <Route path='/wheel' element={<Wheel />} />
      </Routes>
    </Router>
  );
}

export default App;
