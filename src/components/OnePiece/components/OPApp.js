import React  from 'react';
import {} from 'react-bootstrap';
import {Routes, Route, useLocation} from 'react-router-dom'
import OPHeader from './OPHeader'
import OPHome from './OPHome'
import OPCard from './Card/OPCard'
import OPSet from './Set/OPSet'
import OPSetList from './Set/OPSetList'

function OPApp() {
  const location = useLocation();
  const op = location.pathname.includes("/one-piece")

  if (op) {
    return (
      <>
        <OPHeader />
        <div className='app'>
          <Routes>
            <Route path='/one-piece' element={<OPHome />} exact/>
            <Route path='/one-piece/card/:id' element={<OPCard />} exact/>
            <Route path='/one-piece/set' element={<OPSetList />} exact/>
            <Route path='/one-piece/set/:id' element={<OPSet />} exact/>
          </Routes>
          Cool
        </div>
      </>
    );
  } else {
    return('')
  }
  
}

export default OPApp;