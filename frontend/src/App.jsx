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
import Footer from './components/footer/Footer';
import { Toaster } from 'sonner';
import Package from './pages/package/Package';
import DestinationListing from './pages/destinationListing/DestinationListing';

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" richColors />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/destination' element={<Destination />} />
        <Route path='/customise' element={<Custom />} />
        <Route path='/merchandise' element={<Merch />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/corporate-events' element={<Corporate />} />
        <Route path='/package' element={<Package />} />
        <Route path='/destination/list' element={<DestinationListing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
