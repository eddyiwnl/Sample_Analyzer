import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className='section'>
    <h2>Home Page</h2>
      <Link to='/uploadfiles' className='btn'>
        Upload Files for Analysis
      </Link>
      <br></br> 
      <Link to='/existingproject' className='btn'>
        Open Existing Project
      </Link>
      <br></br>
      <Link to='/modeltest' className='btn'>
        Model Testing
      </Link> 
      {/* <br />
      <Link to='/modeloutput' className='btn'>
          Bounding Box Canvas
      </Link> */}
    </section>
  );
};
export default Home;