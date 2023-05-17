import { useState } from 'react';
import { Link } from 'react-router-dom';


const UploadFiles = () => {
    const [file, setFile] = useState();
  
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    const currFile = e.target.files[0]
    console.log("filename: ", e.target.files[0].name)
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