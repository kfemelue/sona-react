import { useState } from 'react';
import { Song, Track, Instrument, Effect } from 'reactronica';

function DrumPad(props) {
  const [notes, setNotes] = useState(null);
  const [playing, setPlaying] = useState(false);
  const samples_map = {
        C3: '/audio/kicks/kick_1.wav',
        D3: '/audio/kicks/kick_2.wav',
         E3:
    }

  return (
    <div>
      <button class="drum-pad-element"
        onMouseDown={()=>{
            setNotes([{name: "C3"}]);
            setPlaying(true);
        }} 
        onMouseUp={()=>{
          setNotes(null);
          setPlaying(false);
        }}
      >
        Kick 1
      </button>

      <button class="drum-pad-element"
        onMouseDown={()=>{
            setNotes([{name: "D3"}]);
            setPlaying(true);
        }} 
        onMouseUp={()=>{
          setNotes(null);
          setPlaying(false);
        }}
      >
        Kick 2
      </button>

        <button class="drum-pad-element"
        onMouseDown={()=>{
            setNotes([{name: "E3"}]);
            setPlaying(true);
        }} 
        onMouseUp={()=>{
          setNotes(null);
          setPlaying(false);
        }}
      >
        Snare 1
      </button>

      <Song isPlaying={playing} bpm={90}>
        <Track steps={['C3']}>
          {/* <Instrument type="synth" /> */}
          <Instrument
            type="sampler"
            notes={notes}
            samples={samples_map}
            // onLoad={(buffers) => {
              
            // }}
          />
        </Track>
      </Song>
    </div>
  )
}

export default DrumPad;
