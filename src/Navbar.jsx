import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { axiosClient } from './axios-client';

const Navbar = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const abortController = useRef();
  const audioElementRef = useRef(null);

  useEffect(() => {
    abortController.current = new AbortController();
    const signal = abortController.current.signal;

    axiosClient
      .get('/songs/selected', { responseType: 'blob', signal })
      .then((response) => {
        const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
        setAudioFile(URL.createObjectURL(audioBlob));
      })
      .catch((error) => {
        console.error('Error fetching audio file:', error);
      });

    return () => {
      abortController.current.abort
        ? abortController.current.abort()
        : abortController.current.abort();
    };
  }, []);

  useEffect(() => {
    function detectClickAndPlay() {
      if (!audioElementRef.current) return;

      if (audioPlaying) return;

      if (audioElementRef.current.paused) {
        audioElementRef.current.loop = true;
        audioElementRef.current.play();
        setAudioPlaying(true);
        document.removeEventListener('click', detectClickAndPlay);
      }
    }

    document.addEventListener('click', detectClickAndPlay);

    return () => {
      document.removeEventListener('click', detectClickAndPlay);
    };
  }, [audioPlaying, audioElementRef]);

  function handleAudioButtonClick() {
    if (!audioElementRef.current) return;

    if (audioPlaying) {
      audioElementRef.current.pause();
    } else {
      audioElementRef.current.play();
    }
  }

  return (
    <nav className='navbar navbar-light bg-light | app-navbar'>
      <div className='container-fluid d-flex justify-content-between'>
        <audio
          ref={audioElementRef}
          autoPlay={true}
          loop={true}
          src={audioFile}
          className='sr-only'
          onPlay={() => setAudioPlaying(true)}
          onPause={() => setAudioPlaying(false)}
        />

        <div>
          <a className='navbar-brand' href='/'>
            Family Tree
          </a>
        </div>
        <ul className='navbar-nav d-flex flex-row gap-3'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              Carousel
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/wheel'>
              Family Group
            </Link>
          </li>
          <li className='nav-item'>
            <a
              href='https://photos.app.goo.gl/g6opsNrn76cXbVDn9'
              className='btn btn-success w-auto'
              target='_blank'
              rel='noreferrer noopener'
            >
              Frame
            </a>
          </li>
          <li>
            <button
              className='btn btn-success'
              disabled={!audioFile}
              onClick={handleAudioButtonClick}
            >
              {audioPlaying ? 'Pause' : 'Play'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
