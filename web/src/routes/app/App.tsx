import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';
import NavBar from '../../components/nav/navbar';
import { NavItemProps } from '../../interfaces';

function App() {
  return (
    <div className="App">
      <NavBar header='test header' />

      <div id='detail'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;