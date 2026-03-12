import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WebsiteLayout from './layouts/WebsiteLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/home/Home';
import Destination from './pages/destination/Destination';
import Custom from './pages/custom/Custom';
import Merch from './pages/merch/Merch';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Corporate from './pages/corporate/Corporate';
import Package from './pages/package/Package';
import DestinationListing from './pages/destinationListing/DestinationListing';
import Blogs from './pages/blogs/Blogs';
import Events from './pages/events/Events';

import Login from './admin/pages/Login/Login';

import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './admin/pages/Dashboard/Dashboard';
import ProtectedRoute from './admin/components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-right' richColors />
      <ScrollToTop />

      <Routes>
        {/* WEBSITE ROUTES */}
        <Route element={<WebsiteLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/destination' element={<Destination />} />
          <Route path='/customise' element={<Custom />} />
          <Route path='/merchandise' element={<Merch />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/corporate-events' element={<Corporate />} />
          <Route path='/package' element={<Package />} />
          <Route path='/destination/list' element={<DestinationListing />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/events' element={<Events />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Login />} />

          <Route
            path='dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
