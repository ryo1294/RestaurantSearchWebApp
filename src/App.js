import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Results from './Results';
import ShopDetail from './ShopDetail';

function App() {

  const getParams = () => {
    let params = "";
    const refList = [...document.querySelectorAll("input[type='checkbox']")];
    const refs = refList.filter(ref => ref.checked);

    refs.forEach((ref, i) => {
      params += i === 0 ? "?" : "&";
      params += ref.value + "=1";
    });

    return params;
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home getParams={getParams}/>} />
        <Route path='/:range/:pageNumber' element={<Results getParams={getParams}/>} />
        <Route path='/:range/:genre/:pageNumber' element={<Results getParams={getParams} />} />
        <Route path='/shop_delites/:id' element={<ShopDetail />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

const NotFound = () => {
  return <p>存在しないページです</p>
}

export default App;
