import { useRef, useState, useEffect } from 'react';
import { Song, Track, Instrument, Effect} from 'reactronica';

function Synth(){
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

    //tempo as a prob, and adsr as a function of tempo

    const divRef = useRef(null);
    const [volume, setVolume] = useState(0)
    const [synthType, setSynthType] = useState("duoSynth");
    const [waveType, setWaveType] = useState("square");
    const [octave, setOctave] = useState(3);
    const [notes, setNotes] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [envelope, setEnvelope] = useState(
        {
            // use seconds as units i.e. 0.015 is 15 ms
            attack: .030,
            decay: .015,
            sustain: .015,
            release: .400
        }
    );
    const [effects, setEffects] = useState(
        [
            {
                type: "distortion",
                wet: .50,
                on: false
            },
            {
                type: "feedbackDelay",
                wet: .50,
                on: false
            }
        ]
    );
    const waveTypes = ["sine", "square", "triangle", "sawtooth"];
    const synthTypes = ["duoSynth","amSynth", "fmSynth", "monoSynth" , "pluckSynth" , "synth"];
    const envelopeOptions = ["attack", "delay", "sustain", "release"];
    
    const playNote = async (note)=> {
        await setNotes([{name: note}]);
        await setPlaying(true);
    };

    const stopNote = async ()=> {
        await setNotes(null);
        await setPlaying(false);
    };

    const handleKeyDown =(event)=>{
        let noteObject = [...blackKeys, ...whiteKeys].find((noteObj)=>{
            return noteObj.qwerty === event.key;
        });
        playNote(noteObject.note);
        // playNote(qwertyNoteMap[event.key])
    };

    const handleKeyUp =()=>{
        stopNote();
    };

    const handleOctaveUp =()=>{
        let newOctave = octave;
        if (octave < 9){
            newOctave+=1;
        };
        setOctave(newOctave)
    };

    const handleOctaveDown =()=>{
        let newOctave = octave;
        if (octave > 1){
            newOctave-=1;
        };
        setOctave(newOctave)
    };

    const handleEffectToggle = async (effectObj) => {
        let tempEffects = [...effects];
        let index = await tempEffects.indexOf(effectObj);
        if (tempEffects[index].on){
            tempEffects[index].on = false;
        } else {
            tempEffects[index].on = true;
        }
        setEffects(tempEffects);
    };

    const handleEditEffect = async (effectObj, wet)=>{
        let tempEffects = [...effects];
        let index = await tempEffects.indexOf(effectObj);
        tempEffects[index].wet = wet;
        setEffects(tempEffects);
    };

    const handleUpdateEnvelope = async (key, value) => {
        let tempEnvelope = {...envelope}
        tempEnvelope[key] = await value;
        setEnvelope(tempEnvelope);
    };

    const handleVolumeChange = async (value) => {
        setVolume(value);
    };


    const handleSelectSynth = (synth) => {
        setSynthType(synth);
    };

    const convertStringToDecimal = (stringNumber)=>{
        return Number(stringNumber)
    };

    const blackKeysHTML = [];
    const whiteKeysHTML = [];
    const effectsHTML = [] // effects do not appear on page, but are added to Tracks as children;
    const effectSlidersHTML = [] // visible on page;
    const selectWaveHTML = [];
    const selectSynthHTML = [];
    const envelopeElementsHTML = [];

    const blackKeys = [
        { note:`C#${octave}`, qwerty:"w", label: "C#" },
        { note:`D#${octave}`, qwerty:"e", label: "D#" },
        { note:`F#${octave}`, qwerty:"t", label: "F#" },
        { note:`G#${octave}`, qwerty:"y", label: "G#" },
        { note:`A#${octave}`, qwerty:"u", label: "A#" }
    ];

    const whiteKeys = [
        { note:`C${octave}`, qwerty:"a", label: "C" },
        { note:`D${octave}`, qwerty:"s", label: "D" },
        { note:`E${octave}`, qwerty:"d", label: "E" },
        { note:`F${octave}`, qwerty:"f", label: "F" },
        { note:`G${octave}`, qwerty:"g", label: "G" },
        { note:`A${octave}`, qwerty:"h", label: "A" },
        { note:`B${octave}`, qwerty:"j", label: "B" }
    ];

    for (let i=0; i<blackKeys.length; i++){
        const note = blackKeys[i];
        const qwerty = blackKeys[i].qwerty;
        const blackKey = <div key={i} 
                className="piano-key-black"
                onMouseDown={() => playNote(note.note) } 
                onMouseUp={() => stopNote() }>
                    <p>{ note.label  }</p>
                    <p>{ qwerty }</p>
                </div>;
        blackKeysHTML.push(blackKey);
    };

    for (let i=0; i<whiteKeys.length; i++){
        const note = whiteKeys[i];
        const qwerty = whiteKeys[i].qwerty;
        const whiteKey = <div key={i}
                className="piano-key-white" 
                onMouseDown={() => { playNote(note.note) }} 
                onMouseUp={() => stopNote() }>
                    <p>{ note.label }</p>
                    <p>{ qwerty }</p>
                </div>;
        whiteKeysHTML.push(whiteKey);
    };

    for (let i=0; i<effects.length; i++){
        if(effects[i].on===true){
            effectsHTML.push(<Effect key={i} type={effects[i].type} wet={effects[i].wet}/>);
        }
    };

    for (let i=0; i<effects.length; i++){
        let html = <div key={i} className="effect-control">
                        <label htmlFor="wet">  {effects[i].type.toLocaleUpperCase()}: </label>
                        <input className="slider" name="wet" type="range" min="0" max="100" onChange={ (event)=>{ handleEditEffect(effects[i], convertStringToDecimal(event.target.value)/100 ) } } />
                            { 
                                effects[i].on ? 
                                <button onClick={ () => { handleEffectToggle(effects[i])}}>Off</button> : 
                                <button onClick={ () => { handleEffectToggle(effects[i])}}>On</button>
                            }
                    </div>
        effectSlidersHTML.push(html)
    };

    for(let i=0; i<waveTypes.length ; i++){
        selectWaveHTML.push(<option key={i} value={waveTypes[i]}>{waveTypes[i]}</option>);
    };

    for(let i=0; i<synthTypes.length ; i++){
        selectSynthHTML.push(<option key={i} value={synthTypes[i]}>{synthTypes[i]}</option>);
    };

    for( let i=0; i<envelopeOptions.length; i++){
        envelopeElementsHTML.push(<div key={i} className="evelope-element">
            <label htmlFor={envelopeOptions[i]}>{`${envelopeOptions[i].charAt(0).toUpperCase()}${envelopeOptions[i].slice(1)}`}</label>
            <input type="range" min="0" max="1000" onChange={(event) => handleUpdateEnvelope(envelopeOptions[i], ( convertStringToDecimal(event.target.value) /1000 ) )} />
            </div>
        )
    }

    useEffect(() => {
        divRef.current.focus();
    }, []);

    return (
        <div>
            <div className="big-box" ref={divRef} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex="0">
                <div className="settings-container">
                    <div className="select-synth-container">
                        {/* <label htmlFor="synthtype">Synth Type: </label> */}
                        <div>
                            <h4>Synth Type:</h4>
                        </div>
                        <div>
                            <select name="synthtype" onChange={(event)=>{handleSelectSynth(event.target.value)}}>
                                <optgroup label="Choose a Type of oscillator wave">
                                    {selectSynthHTML.map(opt => opt)}
                                </optgroup>
                            </select>
                        </div>

                    </div>
                    <div className="envelope-container">
                        <div>
                            <h4>Filter Envelope</h4>
                        </div>
                        {envelopeElementsHTML.map(element => element)}
                    </div>
                    <div className="effect-sliders-container">
                        <div><h4>Effects</h4></div>
                        {effectSlidersHTML.map(effectSlider=>effectSlider)}
                    </div>
                    <div className="volume-container">
                        <div><h4>Volume</h4></div>
                        <div><input type="range" min="-100" max="100" onChange={(event)=> handleVolumeChange(convertStringToDecimal(event.target.value)/10)} /></div>
                    </div>

                </div>

                <div className="select-octave-container">
                    <div className="octave-label" onClick={()=>{ handleOctaveDown() }}><p><i className="arrow down"></i></p></div>
                    <div className="octave-label"><p>Octave: { octave }</p></div>
                    <div className="octave-label" onClick={()=>{ handleOctaveUp() }}><p><i className="arrow up"></i></p></div>
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
                    <Track volume={volume}>
                        <Instrument 
                            notes ={notes}
                            type={synthType}
                            oscillator={{
                                type: waveType
                            }} 
                            envelope = {envelope}
                        />
                        {effectsHTML.map(effect=>{
                            return effect;
                        })}
                    </Track>
                </Song>
            </div>
        </div>
    )
};

export default Synth;
