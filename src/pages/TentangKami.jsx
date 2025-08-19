import React from "react";
import NavClient from "../components/NavClient";
import Footer from "../components/Footer";

export default function TentangKami() {
  return (
    <>
      <NavClient />
      <div className="bg-white py-10 px-6">
     <h1 className="text-center text-5xl text-primary mb-12 font-bold ">Tentang Kami</h1>
        <p className="text-justify max-w-3xl mx-auto text-primary mb-12">
        Salon rumahan Khusus Wanita yang terletak di Jalan Pulau Galang No. 15 Kelapa Gading Barat - Jakarta Utara.

Berdiri sejak tanggal 1 April 2014 hingga kini, dan sudah bersertifikat ijin Usaha Micro.

Kegiatan salon melingkupi kecantikan wajah atau Facial sebagai Mitra dari Dokter Gregory Budiman, M.Biomed selaku pemilik skincare Get Beauty.

Pelatihan salon, bersertifikat dari Yayasan Salon Indonesia.

Makeup bersertifikat dari MUA ternama seperti:
Arman Armano, Fitri Liza dan Dean, Adan Anapha, Olis Herawati, Yuyun Makeup, Rizka Bawono, Ultima II, LA Girl, Make Over, dll.

Perawatan lainnya sebagaimana layaknya salon kecantikan yaitu;
Gunting Rambut, Hairspa atau Creambath, Smoothing, dan Coloring.

Yulia Beauty Salon, melengkapi kebutuhan warga komplek dan sekitarnya akan perawatan kecantikan kulit dan rambut khusus wanita dengan harga terjangkau serta fasilitas yang nyaman, aman, lengkap sesuai prosedural.
        </p>


        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 max-w-6xl mx-auto">
        
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2 text-primary">Visi Kami</h2>
            <p className="text-justify text-primary mb-6">
              Menjadi salon kecantikan rumahan terpercaya bagi wanita dengan layanan profesional, berkualitas, dan terjangkau, didukung oleh tenaga ahli bersertifikat serta produk terbaik untuk meningkatkan kecantikan alami dan kepercayaan diri pelanggan.
            </p>

            <h2 className="text-xl font-bold mb-2 text-primary">Misi Kami</h2>
            <p className="text-primary">
             <ul>1. Memberikan Layanan Profesional – Menyediakan perawatan wajah (facial), rambut, dan makeup dengan standar tinggi oleh tim bersertifikat dari pelatihan ternama.</ul>
             <ul>2. Kenyamanan dan Keamanan – Menciptakan lingkungan salon yang nyaman, privat, dan higienis khusus untuk wanita.</ul>
             <ul>3. Pelayanan Ramah dan Personal – Membangun hubungan baik dengan pelanggan melalui pendekatan personal dan solusi kecantikan yang sesuai kebutuhan.</ul>
            </p>
          </div>

          <div className="flex-1">
            <img
              src="/logoyulia.jpg"
              alt="Tentang Kami"
              className="rounded-lg shadow-md w-full object-cover h-100 object-center"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
