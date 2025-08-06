import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-text text-white py-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-bold mb-2">Yulia Beauty Salon</h4>
          <p>
            Perawatan kecantikan profesional dengan pengalaman bertahun-tahun.
          </p>
          <div className="flex space-x-3 mt-3">
            <a href="https://www.instagram.com/yuliabeautysalon?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><FaInstagram /></a>
            <a href="#"><FaWhatsapp /></a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-2">Layanan</h4>
          <ul>
            <li>Perawatan Wajah</li>
            <li>Perawatan Rambut</li>
            <li>Manicure & Pedicure</li>
            <li>Body Treatment</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Kontak Kami</h4>
          <p>Jl. Pulau Galang No. 15 Kelapa Gading Jakarta Utara</p>
          <p>Telp: 0895-1460-1931</p>
          <p>Email: info@yuliabeauty.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
