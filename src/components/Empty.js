import React from 'react';
import EmptyImage from '../assets/empty.svg';



const Empty = () =>
  <div style={{ height: '280px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <img src={EmptyImage}></img>
    <p style={{ fontSize: 12, marginTop: 10 }}>Data Tidak Ditemukan</p>
  </div>


export default Empty;