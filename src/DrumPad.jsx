import { useRef, useState, useEffect } from 'react';
import { Song, Track, Instrument, Effect } from 'reactronica';

function DrumPad(props) {
  /**
   * TODO:
   * refactor pad button rendering with loops
   */
  const divRef = useRef(null);
  const [notes, setNotes] = useState(null);
  const [playing, setPlaying] = useState(false);
  const samples_map = {
        C3: '/audio/kicks/kick_1.wav',
        D3: '/audio/kicks/kick_2.wav',
        E3: '/audio/snares/atlanta_snare.wav',
        F3: '/audio/snares/clean_snare_nola_bounce.wav',
        G3: '/audio/percs/perc.wav',
        B3: '/audio/hihats/tight_hat.wav'
  }

 const playNote =(note)=> {
    setNotes([{name: note}]);
    setPlaying(true);
  }

  const stopNote =()=> {
    setNotes(null);
    setPlaying(false);
  }

  const handleKeyDown =(event)=>{
    const map = {
      "q": "C3",
      "w": "D3",
      "e": "E3",
      'a': "F3",
      's': "G3",
      'd': "B3"
    }
    playNote(map[event.key])
  }

  const handleKeyUp =()=>{
    stopNote();
  }
  
  useEffect(() => {
    divRef.current.focus();
  }, []);


  return (
    <div>
      <div className="drum-pad-container" ref={divRef} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex="0">
        <button className="drum-pad-element"
          onMouseDown={()=>playNote("C3")} 
          onMouseUp={()=>stopNote()}
          onKeyDown={(event)=>handleKeyDown(event)}
        >
          Kick 1
        </button>

        <button className="drum-pad-element"
          onMouseDown={()=>playNote("D3")} 
          onMouseUp={()=>stopNote()}
        >
          Kick 2
        </button>

        <button className="drum-pad-element"
          onMouseDown={()=>playNote("E3")} 
          onMouseUp={()=>stopNote()}
        >
          Snare 1
        </button>
        <button className="drum-pad-element"
          onMouseDown={()=>playNote("F3")} 
          onMouseUp={()=>stopNote()}
        >
          Snare 2
        </button>
        <button className="drum-pad-element"
          onMouseDown={()=>playNote("G3")} 
          onMouseUp={()=>stopNote()}
        >
          perc 1
        </button>
        <button className="drum-pad-element"
          onMouseDown={()=>playNote("B3")} 
          onMouseUp={()=>stopNote()}
        >
          hi hat
        </button>

        <Song isPlaying={playing} bpm={90}>
          <Track >
            {/* <Instrument type="synth" /> */}
            <Instrument
              type="sampler"
              notes={notes}
              samples={samples_map}
            />
          </Track>
        </Song>
      </div>
    </div>
  )
}

export default DrumPad;
