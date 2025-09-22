import { useState } from 'react';
import { Song, Track, Instrument, Effect } from 'reactronica';
import './App.css';
import DrumPad from './DrumPad';
import Synth from './Synth'

function App() {

  return (
    <div>
      {/* <DrumPad /> */}
      <Synth />
    </div>
  )
}

export default App
