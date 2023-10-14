/** @format */

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Items from './redux/features/Items';
import ItemDetail from './redux/features/itemDetail';

function App() {
  return (
    <>
      <div>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route index element={<Items />} />
            <Route path="/" element={<Items />} />
            <Route path="/home" element={<Items />} />
            <Route path="/item/:itemId" element={<ItemDetail />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
