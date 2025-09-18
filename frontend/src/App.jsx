import React from 'react'
import { Route,Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import  NoteDetailPage from './pages/NoteDetailPage.jsx';

const App = () => {
  return (
         <div className='relative h-full w-full'>
          <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24'  style={{background: "radial-gradient(125% 125% at 50% 10%, #000 60%)"}}/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/create' element={<CreatePage/>}/>
            <Route path='/note/:id' element={<NoteDetailPage/>}/>
          </Routes>
         </div>
  )
}

export default App