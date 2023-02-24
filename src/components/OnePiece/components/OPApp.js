import React  from 'react';
import {} from 'react-bootstrap';
import {Routes, Route, useLocation} from 'react-router-dom'
import OPHeader from './OPHeader'
import OPHome from './OPHome'
import OPCard from './Card/OPCard'
import OPSet from './Set/OPSet'
import OPSetList from './Set/OPSetList'
import OPSearch from './Search/OPSearch'
import OPSignup from './account/OPSignup'
import OPAccount from './account/OPAccount'
import OPCreateDeck from './Deck/OPCreateDeck'
import OPDeckList from './Deck/OPDeckList'
import OPDeck from './Deck/OPDeck';
import OPAddNews from './News/OPAddNews';
import OPNewsList from './News/OPNewsList';
import OPNews from './News/OPNews';
import ProtectedRoute from '../components/account/ProtectedRoute';

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
            <Route path='/one-piece/decks' element={<OPDeckList />} exact/>
            <Route path='/one-piece/decks/:id' element={<OPDeck />} exact/>
            <Route path='/one-piece/search' element={<OPSearch />} exact/>
            <Route path='/one-piece/signup' element={<OPSignup />} exact/>
            <Route path='/one-piece/account' element={<OPAccount />} exact/>
            <Route path='/one-piece/create-deck' element={<ProtectedRoute><OPCreateDeck /></ProtectedRoute>} exact/>
            <Route path='/one-piece/add-news' element={<ProtectedRoute><OPAddNews /></ProtectedRoute>} exact/>
            <Route path='/one-piece/news' element={<OPNewsList />} exact/>
            <Route path='/one-piece/news/:id' element={<OPNews />} exact/>
          </Routes>
        </div>
      </>
    );
  } else {
    return('')
  }
  
}

export default OPApp;