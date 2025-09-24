import { useRef, useState, useEffect } from 'react';
import { Song, Track, Instrument, Effect} from 'reactronica';

function Synth(){
    /**
     * TODO: control the following with useState
     * Add menu to choose an octave and set octave state variable with strings, options "1" through "5"
     * Add Controls to set envelope ADSR object 
     * Add html to toggle effects and modify the dry/wet mix of the effect
     * Add styling to control select menus for wave type and synth type
     * --- streth: Add a polyphony state variable and html to control it
     */
    // 
    const divRef = useRef(null);
    const [synthType, setSynthType] = useState("duoSynth");
    const [waveType, setWaveType] = useState("square");
    const [effects, setEffects] = useState(
        [
            {
                type: "distortion",
                wet: .50,
                on: true
            }
        ]
    )
    const [octave, setOctave] = useState("3");
    const [notes, setNotes] = useState(null);


    // can pass playing to synth component as prop if multiple instrument components on same page
    const [playing, setPlaying] = useState(false);


    
    
    const [envelope, setEnvelope] = useState(
        {
            //use seconds as units i.e. 0.015 is 15 ms
            attack: .030,
            decay: .015,
            sustain: .015,
            release: .400
        }
    )

    // const qwertyNoteMap = {
    //   "a": "C3",
    //   "w": "C#3",
    //   "s": "D3",
    //   "e": "D#3",
    //   "d": "E3",
    //   "f": "F3",
    //   "t": "F#3",
    //   "g": "G3",
    //   "y": "G#3",
    //   "h": "A3",
    //   "u": "A#3",
    //   "j": "B3"
    // }

    const waveTypes = ["sine", "square", "triangle", "sawtooth"];
    const synthTypes = ["amSynth", "duoSynth", "fmSynth", "monoSynth" , "pluckSynth" , "synth"];

    const playNote = async (note)=> {
        await setNotes([{name: note}]);
        await setPlaying(true);
    }

    const stopNote = async ()=> {
        await setNotes(null);
        await setPlaying(false);
    }

    const handleKeyDown =(event)=>{
        let noteObject = [...blackKeys, ...whiteKeys].find((noteObj)=>{
            return noteObj.qwerty === event.key
        })
        playNote(noteObject.note)
        // playNote(qwertyNoteMap[event.key])
    }

    const handleKeyUp =()=>{
        stopNote();
    }

    const handleAddEffect = (effect, wet)=>{
        myEffects = [...effects]
        myEffects.push({type: effect, wet: wet})
        setEffects(myEffects)
    }

    const handleRemoveEffect =(effect)=>{
        setEffects(effects.filter((effectToRemove)=>{
            return effect !== effectToRemove.type
        }))
    }

    const handleSelectWave = (wave) => {
        setWaveType(wave);
        console.log(wave)
    }

    const handleSelectSynth = (synth) => {
        setSynthType(synth);
        console.log(synth)
    }

    const blackKeysHTML = []
    const whiteKeysHTML = []
    const effectsHTML = []
    const selectWaveHTML = []
    const selectSynthHTML = []

    const blackKeys = [
        { note:`C#${octave}`, qwerty:"w", label: "C#" },
        { note:`D#${octave}`, qwerty:"e", label: "D#" },
        { note:`F#${octave}`, qwerty:"t", label: "F#" },
        { note:`G#${octave}`, qwerty:"y", label: "G#" },
        { note:`A#${octave}`, qwerty:"u", label: "A#" }
    ]
    const whiteKeys = [
        { note:`C${octave}`, qwerty:"a", label: "C" },
        { note:`D${octave}`, qwerty:"s", label: "D" },
        { note:`E${octave}`, qwerty:"d", label: "E" },
        { note:`F${octave}`, qwerty:"f", label: "F" },
        { note:`G${octave}`, qwerty:"g", label: "G" },
        { note:`A${octave}`, qwerty:"h", label: "A" },
        { note:`B${octave}`, qwerty:"j", label: "B" }
    ]

    for (let i=0; i<blackKeys.length; i++){
        const note = blackKeys[i];
        const qwerty = blackKeys[i].qwerty;
        const blackKey = <div key={i} 
                className="piano-key-black"
                onMouseDown={()=> playNote(note.note) } 
                onMouseUp={()=> stopNote() }>
                    <p>{ note.label  }</p>
                    <p>{ qwerty }</p>
                </div>
        blackKeysHTML.push(blackKey)
    }

    for (let i=0; i<whiteKeys.length; i++){
        const note = whiteKeys[i];
        const qwerty = whiteKeys[i].qwerty;
        const whiteKey = <div key={i}
                className="piano-key-white" 
                onMouseDown={()=> {playNote(note.note)}} 
                onMouseUp={()=> stopNote() }>
                    <p>{ note.label }</p>
                    <p>{ qwerty }</p>
                </div>
        whiteKeysHTML.push(whiteKey)
    }

    for (let i=0; i<effects.length; i++){
        if (effects[i].on){
            effectsHTML.push(<Effect key={i} type={effects[i].type} wet={effects[i].wet}/>)
        }
    }

    for(let i=0; i<waveTypes.length ; i++){
        selectWaveHTML.push(<option key={i} value={waveTypes[i]}>{waveTypes[i]}</option>)
    }

    for(let i=0; i<synthTypes.length ; i++){
        selectSynthHTML.push(<option key={i} value={synthTypes[i]}>{synthTypes[i]}</option>)
    }





    useEffect(() => {
        divRef.current.focus();
    }, []);

    return (
        <div>
            <div className="big-box" ref={divRef} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex="0">
                <div id="select-container">
                    <label htmlFor="wavetype">Set Wavetype: </label>
                    <select name="wavetype" onChange={(event)=>{handleSelectWave(event.target.value)}}>
                        <optgroup label="Choose a Type of oscillator wave">
                            {selectWaveHTML.map(opt => opt)}
                        </optgroup>
                    </select>
                </div>

                <div id="select-container">
                    <label htmlFor="synthtype">Set Synth Type: </label>
                    <select name="synthtype" onChange={(event)=>{handleSelectSynth(event.target.value)}}>
                        <optgroup label="Choose a Type of oscillator wave">
                            {selectSynthHTML.map(opt => opt)}
                        </optgroup>
                    </select>
                </div>
                
                <div className="piano-keys-container">
                    <div className="piano-keys-row-black">
                        {blackKeysHTML.map( ( key )=> {return key})}
                    </div>
                    <div className="piano-keys-row-white">
                        {whiteKeysHTML.map( ( key ) =>{ return key})}
                    </div>
                </div>

                <Song isPlaying={playing}>
                    <Track>
                        <Instrument 
                            notes ={notes}
                            type={synthType}
                            oscillator={{
                                type: waveType
                            }} 
                            envelope = {envelope}
                        />
                        {effectsHTML.map(effect=>{
                            return effect
                        })}
                    </Track>
                </Song>
            </div>
        </div>
    )
}

export default Synth;
