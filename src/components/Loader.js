import React from 'react';
import LoaderImage from '../assets/loader.svg';



const Loader = () => <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <img src={LoaderImage}></img>
</div>


export default Loader;