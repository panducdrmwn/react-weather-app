import {React, useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Routes/Home/Home'
import Forecast from './components/Routes/Forecast/Stats'

const App = () => {

  

  return (
    <Routes>
      <Route path='/' element={<Home/>} />  
      <Route path='/forecast' element={<Forecast/>} />
    </Routes>
  )
}

export default App