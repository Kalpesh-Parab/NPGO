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
import HomepageEditor from './admin/pages/homePage/HomepageEditor';
import PackageCreator from './admin/pages/packageCreator/PackageCreator';

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
          <Route
            path='/destination/:country'
            element={<DestinationListing />}
          />
          <Route
            path='/destination/:country/:destination'
            element={<DestinationListing />}
          />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/events' element={<Events />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path='/admin' element={<AdminLayout />}>
          {/* login */}
          <Route index element={<Login />} />

          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='homepageEditor' element={<HomepageEditor />} />
            <Route path='packageCreator' element={<PackageCreator />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
