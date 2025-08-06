import React from "react";
import NavClient from "../components/NavClient";
import Footer from "../components/Footer";

export default function TentangKami() {
  return (
    <>
      <NavClient />
      <div className="bg-white py-10 px-6">
     
        <p className="text-center max-w-3xl mx-auto text-primary mb-12">
          Yulia Beauty Salon adalah tempat di mana kecantikan dan perawatan diri bertemu
          dengan profesionalisme dan keahlian. Kami berkomitmen untuk memberikan
          pengalaman terbaik bagi setiap klien.
        </p>

     
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 max-w-6xl mx-auto">
        
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2 text-primary">Visi Kami</h2>
            <p className="text-primary mb-6">
              Menjadi salon kecantikan terkemuka yang dikenal karena layanan berkualitas
              tinggi dan kepuasan pelanggan yang luar biasa.
            </p>

            <h2 className="text-xl font-bold mb-2 text-primary">Misi Kami</h2>
            <p className="text-primary">
              Memberikan perawatan kecantikan yang inovatif dan efektif dengan
              menggunakan produk berkualitas tinggi serta teknik terbaru, sambil
              menciptakan lingkungan yang nyaman dan menyenangkan bagi semua klien.
            </p>
          </div>

          <div className="flex-1">
            <img
              src="/tentangkami.jpg"
              alt="Tentang Kami"
              className="rounded-lg shadow-md w-full object-cover h-80 object-center"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
