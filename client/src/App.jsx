import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemComponent from './components/ItemComponent';
import NewBillComponent from './components/NewBillComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<ItemComponent />} />
        <Route path="/newbill/:id" element={<NewBillComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
