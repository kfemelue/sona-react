import { useState } from 'react';
import { Song, Track, Instrument, Effect } from 'reactronica';
import './App.css';
import DrumPad from './DrumPad';
import Synth from './Synth'

function App() {

  return (
    //pass config pros to components
    <div>
      {/* <DrumPad /> */}
      <Synth />
    </div>
  )
}

export default App
