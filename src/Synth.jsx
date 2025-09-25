import { useRef, useState, useEffect } from 'react';
import { Song, Track, Instrument, Effect} from 'reactronica';

function Synth(){
    /**
     * TODO: control the following with useState
     * Add menu to choose an octave and set octave state variable with strings, options "1" through "5"
     * Add Controls to set envelope ADSR object 
     * Add styling to control select menus for wave type and synth type
     * --- stretch: 
     *  - Add a Filter Envelope and add a polyphony state variable and html to control it
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
                on: false
            },
            {
                type: "feedbackDelay",
                wet: .50,
                on: false
            }
        ]
    );

    const [octave, setOctave] = useState("3");
    const [notes, setNotes] = useState(null);

    // can pass playing to synth component as prop if multiple instrument components on same page
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
    const synthTypes = ["duoSynth","amSynth", "fmSynth", "monoSynth" , "pluckSynth" , "synth"];

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

    const handleEffectToggle = async (effectObj) => {
        let tempEffects = [...effects];
        let index = await tempEffects.indexOf(effectObj);
        if (tempEffects[index].on){
            tempEffects[index].on = false;
        } else {
            tempEffects[index].on = true;
        }
        setEffects(tempEffects);
    }

    const handleEditEffect = async (effectObj, wet)=>{
        let tempEffects = [...effects];
        let index = await tempEffects.indexOf(effectObj);
        tempEffects[index].wet = wet;
        setEffects(tempEffects);
    }

    const handleSelectWave = (wave) => {
        setWaveType(wave);
    };

    const handleSelectSynth = (synth) => {
        setSynthType(synth);
    };

    const convertStringToDecimal = (stringNumber)=>{
        return (Number(stringNumber)/100)
    }

    const blackKeysHTML = [];
    const whiteKeysHTML = [];
    const effectsHTML = [] // effects do not appear on page, but are added to output song as children;
    const effectSlidersHTML = [];
    const selectWaveHTML = [];
    const selectSynthHTML = [];

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
                onMouseDown={() => {playNote(note.note)}} 
                onMouseUp={() => stopNote()}>
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
        let html = <div key={i} className="effects-container">
                    <div className="effect-control">
                        <label htmlFor="wet">  {effects[i].type.toLocaleUpperCase()}: </label>
                        <input name="wet" type="range" min="0" max="100" onChange={ (event)=>{ handleEditEffect(effects[i], convertStringToDecimal(event.target.value) ) } } />
                            { 
                                effects[i].on ? 
                                <button onClick={ () => { handleEffectToggle(effects[i])}}> Turn  {effects[i].type.toLocaleUpperCase()} Off</button> : 
                                <button onClick={ () => { handleEffectToggle(effects[i])}}> Turn  {effects[i].type.toLocaleUpperCase()} Effect On </button>
                            }
                    </div>
                    </div>
        effectSlidersHTML.push(html)
    }

    for(let i=0; i<waveTypes.length ; i++){
        selectWaveHTML.push(<option key={i} value={waveTypes[i]}>{waveTypes[i]}</option>);
    };

    for(let i=0; i<synthTypes.length ; i++){
        selectSynthHTML.push(<option key={i} value={synthTypes[i]}>{synthTypes[i]}</option>);
    };


    useEffect(() => {
        divRef.current.focus();
    }, []);

    return (
        <div>
            <div className="big-box" ref={divRef} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex="0">
                {/* <div class="select-container">
                    <label htmlFor="wavetype">Set Wavetype: </label>
                    <select name="wavetype" onChange={(event)=>{handleSelectWave(event.target.value)}}>
                        <optgroup label="Choose a Type of oscillator wave">
                            {selectWaveHTML.map(opt => opt)}
                        </optgroup>
                    </select>
                </div> */}


                <div className="select-container">
                    <label htmlFor="synthtype">Set Synth Type: </label>
                    <select name="synthtype" onChange={(event)=>{handleSelectSynth(event.target.value)}}>
                        <optgroup label="Choose a Type of oscillator wave">
                            {selectSynthHTML.map(opt => opt)}
                        </optgroup>
                    </select>
                </div>
                {effectSlidersHTML.map(effectSlider=>effectSlider)}

                {/* <div className="effects-container">
                    <div className="effect-control">
                            <label htmlFor="wet">  {effects[0].type}: </label>
                            <input name="wet" type="range" min="0" max="100" onChange={ (event)=>{ handleEditEffect(effects[0], convertStringToDecimal(event.target.value) ) } } />
                            { effects[0].on ? <button onClick={ () => { handleEffectToggle(effects[0]) }}> Turn Effect Off</button> : <button onClick={ () => { handleEffectToggle(effects[0]) }}> Turn Effect On </button>}
                    </div>
                </div> */}

                {/* <div className="effects">
                    {effectSlidersHTML.map(slider=>slider)}
                </div> */}
                
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
                            return effect;
                        })}
                    </Track>
                </Song>
            </div>
        </div>
    )
}

export default Synth;
