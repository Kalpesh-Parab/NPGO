import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Destination from './pages/destination/Destination';
import Custom from './pages/custom/Custom';
import Merch from './pages/merch/Merch';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Corporate from './pages/corporate/Corporate';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/destination' element={<Destination />} />
        <Route path='/customise' element={<Custom />} />
        <Route path='/merchandise' element={<Merch />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/corporate-events' element={<Corporate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
