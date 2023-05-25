import { useState } from 'react';
import { Link } from 'react-router-dom';

// const unhandled = require('electron-unhandled');

// unhandled();

const ModelTest = () => {
    const [loading, setLoading] = useState(false) // Whether or not the model is currently running

    const runSimpleScript = () => {
        console.log("Hello from ModelTest.js")
        // Do arg logic here
        const pythonArgs = ['./model_core/Model/model_checkpoint_map583.ckpt', './model_core/testImages/test_img_1.jpg']
        window.electronAPI.ipcR.sendPythonArgs(pythonArgs);
        setLoading(true);
        window.electronAPI.ipcR.callPythonFile()
        console.log("Finished running")
        
    }
    window.electronAPI.ipcR.handleScriptFinish((event, value) => {
        setLoading(false);
    })
  
    return (
      <section className='section'>
        <h2>Model Test</h2>
        <Link to='/' className='btn'>
            Back Home
        </Link>

        <button onClick={() => runSimpleScript()}
                        className="b1"
                    >
                    Run Script 
        </button>
        {
            !loading && 
            <h2>Model idle...</h2>
        }    
        {
            loading && 
            <h2>Running model...</h2>
        }      
        </section>
    );
  };
  export default ModelTest;