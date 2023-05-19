import { useState } from 'react';
import { Link } from 'react-router-dom';


const UploadFiles = () => {
    const [file, setFile] = useState();
  
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    const currFile = e.target.files[0]
    const currFiles = e.target.files
    // console.log("filename: ", currFile.name)
    console.log("current files:", currFiles)
    const test_file_paths = []
    for (var i = 0; i < currFiles.length; i++) {
      test_file_paths.push(currFiles[i].path)
    }
    console.log("test file path:", test_file_paths)
    console.log("current file names stringed:", JSON.stringify(test_file_paths));
    sessionStorage.setItem("fileList", JSON.stringify(test_file_paths));  
  }
  
    return (
      <section className='section'>
        <h2>UploadFiles</h2>
        <Link to='/' className='btn'>
            Back Home
         </Link>
      <input type="file" multiple onChange={handleChange} />
        {/* <img src={file} /> */}
        {/* <Link to='/modeloutput' className='btn'>
            Run Model
         </Link> */}
         <br />
      <Link to='/modeloutput' className='btn'>
          Bounding Box Editor
      </Link>
      </section>
    );
  };
  export default UploadFiles;