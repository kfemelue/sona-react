import { useState, useEffect } from 'react';
import { Song, Track, Instrument, Effect } from 'reactronica';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import DrumPad from './DrumPad';
import Synth from './Synth'

function App() {
  // const divRef = useRef(null);
  
  // useEffect(() => {
  //   divRef.current.focus();
  // }, []);
  const {user, isLoading, loginWithRedirect, logout} = useAuth0();
  
  return (
    //pass config pros to components

    <div>
      {/* <DrumPad /> */}
      {user && !isLoading && (
        <div>
            <button onClick={()=>logout()}>Log Out</button>
            <Synth />
        </div>
      )}
      {!user && !isLoading && (
        <button onClick={()=>loginWithRedirect()}>Log In</button>
      )}
      
    </div>
  )
}

export default App
