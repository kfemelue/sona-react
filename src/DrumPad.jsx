import { useState } from 'react';
import { Song, Track, Instrument, Effect } from 'reactronica';

function DrumPad(props) {
  const [notes, setNotes] = useState(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <button 
        onMouseDown={()=>{
            setNotes([{name: "C3"}]);
            setPlaying(true);
        }} 
        onMouseUp={()=>{
          setNotes(null);
          setPlaying(false);
        }}
      >
        Kick
      </button>

      <button 
        onMouseDown={()=>{
            setNotes([{name: "D3"}]);
            setPlaying(true);
        }} 
        onMouseUp={()=>{
          setNotes(null);
          setPlaying(false);
        }}
      >
        Kick
      </button>

      <Song isPlaying={playing} bpm={90}>
        <Track steps={['C3']}>
          {/* <Instrument type="synth" /> */}
          <Instrument
            type="sampler"
            notes={notes}
            samples={{
              C3: '/audio/kicks/kick_2.wav',
              D3: '/audio/kicks/kick_1.wav'
            }}
            // onLoad={(buffers) => {
              
            // }}
          />
        </Track>
      </Song>
    </div>
  )
}

export default DrumPad;
