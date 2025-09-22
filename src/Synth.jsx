import { useRef, useState, useEffect } from 'react';
import { Song, Track, Instrument, Effect} from 'reactronica';

function Synth(){
    // synth with piano roll
    const divRef = useRef(null);
    const [waveType, setWaveType] = useState("square");
    const [notes, setNotes] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [synthType, setSynthType] = useState("duoSynth");
    // amSynth | duoSynth | fmSynth | membraneSynth | metalSynth | monoSynth | pluckSynth | synth
    
    const [envelope, setEnvelope] = useState(
        {
            //use seconds as units i.e. 0.015 is 15 ms
            attack: .030,
            decay: .015,
            sustain: .015,
            release: .400
        }
    )

    const keyNoteMap = {
      "a": "C3",
      "w": "C#3",
      "s": "D3",
      "e": "D#3",
      "d": "E3",
      'f': "F3",
      "t": "F#3",
      'g': "G3",
      "y": "G#3",
      'h': "A3",
      'u': "A#3",
      'j': "B3"
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
        playNote(keyNoteMap[event.key])
        console.log(event.key + ' down')
    }

    const handleKeyUp =(event)=>{
        stopNote();
        console.log(event.key + ' up')
    }
  
    useEffect(() => {
        divRef.current.focus();
    }, []);

    return (
        <div>
            <div className="big-box" ref={divRef} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex="0">
                <div className="piano-keys-container">
                    <div className="piano-keys-row-black">
                        <div className="piano-key-black"> <p>C#</p> <p>w</p> </div>
                        <div className="piano-key-black"> <p>D#</p> <p>e</p> </div>
                        <div className="piano-key-black"> <p>F#</p> <p>t</p> </div>
                        <div className="piano-key-black"> <p>G#</p> <p>y</p> </div>
                        <div className="piano-key-black"> <p>A#</p> <p>u</p> </div>
                    </div>
                    <div className="piano-keys-row-white">
                        <div className="piano-key-white"> <p>C</p> <p>a</p> </div>
                        <div className="piano-key-white"> <p>D</p> <p>s</p> </div>
                        <div className="piano-key-white"> <p>E</p> <p>d</p> </div>
                        <div className="piano-key-white"> <p>F/E#</p> <p>f</p> </div>
                        <div className="piano-key-white"> <p>G</p> <p>g</p> </div>
                        <div className="piano-key-white"> <p>A</p> <p>h</p> </div>
                        <div className="piano-key-white"> <p>B</p> <p>j</p> </div>
                    </div>
                </div>

                <Song>
                    <Track>
                        <Instrument 
                            notes ={notes}
                            type={synthType}
                            oscillator={{
                                type: waveType
                            }} 
                            envelope = {envelope}
                        />
                        <Effect type="distortion" wet={.50}/>
                    </Track>
                </Song>
            </div>
        </div>
    )
}

export default Synth;
