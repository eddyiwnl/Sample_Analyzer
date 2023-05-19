import { useState } from 'react';
import { Link } from 'react-router-dom';


const ModelTest = () => {
    const [loading, setLoading] = useState(false) // Whether or not the model is currently running

    const runSimpleScript = () => {
        console.log("Hello from ModelTest.js")
        setLoading(true);
        window.electronAPI.ipcR.callPythonFile()
    }
  
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
        </section>
    );
  };
  export default ModelTest;