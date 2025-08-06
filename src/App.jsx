import { Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import "./App.css";

import Home from "./pages/Home";
import Layanan from "./pages/Layanan";
import LayananAdmin from "./pages/admin/LayananAdmin";
import BookingForm from "./pages/BookingForm";
import Kontak from "./pages/Kontak";
import KontakAdmin from "./pages/admin/KontakAdmin";
import TentangKami from "./pages/TentangKami";
import Galeri from "./pages/Galeri";
import GaleriAdmin from "./pages/admin/GaleriAdmin";
import ReviewAdmin from "./pages/admin/ReviewAdmin";
import BookingAdmin from "./pages/admin/BookingAdmin";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/layanan" element={<Layanan />} />

        <Route path="/layanan-admin" element={<LayananAdmin/>} />
        <Route path="/kontak-admin" element={<KontakAdmin/>}/>
        <Route path="/galeri-admin" element={<GaleriAdmin/>}/>
        <Route path="/reviews-admin" element={<ReviewAdmin/>}/>
        <Route path="/history-booking" element={<BookingAdmin/>}/>
        <Route path="/admin/login" element={<Login/>}/>
        <Route path="/admin/register" element={<Register/>}/>



        <Route path="/booking-form" element={<BookingForm/>} />
        <Route path="/kontak" element={<Kontak/>} />
        <Route path="/tentang-kami" element={<TentangKami/>} />
        <Route path="/galeri" element={<Galeri/>} />
      </Routes>
    </>
  );
}

export default App;
