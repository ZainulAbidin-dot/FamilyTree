import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { axiosClient, BACKEND_URL } from './axios-client';

const Navbar = () => {
  const [songs, setSongs] = useState([]);
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const abortController = useRef();
  const audioElementRef = useRef(null);

  useEffect(() => {
    abortController.current = new AbortController();
    axiosClient
      .get('/songs/selected', { signal: abortController.current.signal })
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) === false) {
          alert('Invalid data format');
          setSongs([]);
        } else {
          const formattedSongs = data.map((song) => {
            return {
              ...song,
              url: `${BACKEND_URL}/${song.url}`,
            };
          });
          setSongs(formattedSongs);
          setActiveSongIndex(0);
        }
      })
      .catch((error) => {
        if (error.name !== 'CanceledError') {
          console.error('Error fetching songs:', error);
          setSongs([]);
        }
      });
  }, []);

  function handleAudioButtonClick() {
    if (!audioElementRef.current) return;

    if (audioPlaying) {
      audioElementRef.current.pause();
    } else {
      audioElementRef.current.play();
    }
  }

  function handleAudioPlay() {
    console.log('Song started');
    setAudioPlaying(true);
  }

  function handleAudioPause() {
    console.log('Song paused');
    setAudioPlaying(false);
  }

  function handleAudioEnded() {
    // ended event is not fired when the song is set to loop
    // when a song ends, first pause event is fired, then ended event
    console.log('Song ended');
    // update the active song index
    setActiveSongIndex((prev) => {
      return prev + 1 >= songs.length ? 0 : prev + 1;
    });    
  }

  return (
    <nav className='navbar navbar-light bg-light | app-navbar'>
      <div className='container-fluid d-flex justify-content-between'>
        <audio
          ref={audioElementRef}
          autoPlay={true}
          loop={songs.length === 1} // only loop if there's only one song
          src={songs[activeSongIndex]?.url}
          className='sr-only'
          onPlay={handleAudioPlay}
          onPause={handleAudioPause}
          onEnded={handleAudioEnded}
        />

        <div>
          <a className='navbar-brand' href='/'>
            FAMILY TREE
          </a>
        </div>
        <ul className='navbar-nav d-flex flex-row gap-3'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              THE TREES
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/orchard'>
              THE ORCHARD
            </Link>
          </li>
          <li className='nav-item'>
            <a
              href='https://photos.app.goo.gl/g6opsNrn76cXbVDn9'
              className='btn btn-success w-auto'
              target='_blank'
              rel='noreferrer noopener'
            >
              YIDDISHE NACHAS
            </a>
          </li>
          <li>
            <button
              className='btn btn-success'
              disabled={!songs.length}
              onClick={handleAudioButtonClick}
            >
              {audioPlaying ? 'PAUSE' : 'PLAY'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
