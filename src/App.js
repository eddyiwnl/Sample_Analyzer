// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import { HashRouter, Routes, Route } from 'react-router-dom';
import UploadFiles from './UploadFiles';
import ExistingProject from './ExistingProject';
import ModelOutput from './ModelOutput';
import ModelTest from './ModelTest';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';


function App() {
  const [projectData, setProjectData] = React.useState()
  return (
    <HashRouter>
      <div className="App">
        <Routes>
              <Route path="/" element={<Home />} />
              <Route path="uploadfiles" element={<UploadFiles />} />
              <Route path="existingproject" element={<ExistingProject />} />
              <Route path="modeltest" element={<ModelTest />} />
              <Route exact path="/modeloutput" element={<ModelOutput projectData={projectData} setProjectData={setProjectData} filename={'Excel Output'}/>} />

        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
