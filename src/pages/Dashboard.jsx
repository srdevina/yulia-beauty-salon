import Footer from "../components/Footer";
import GaleriSnap from "../components/GaleriSnap";
import LayananSnap from "../components/LayananSnap";
import NavClient from "../components/NavClient";
import ReviewSnap from "../components/ReviewSnap";

export default function Dashboard() {
  return (
    <>
      {/* Navbar */}
      <NavClient />

      <section className="bg-secondary w-full min-h-screen flex items-center font-poppins text-primary">
        <div className="flex flex-col md:flex-row items-center gap-6 px-6 py-12 w-full max-w-7xl mx-auto">
          <div className="flex-1">
            <h2 className="text-6xl font-bold leading-tight mb-4">
              Kecantikan Alami <br /> dengan Sentuhan Profesional
            </h2>
            <p className="mb-6 justify-center">
             Tempat perawatan ternyaman untuk memanjakan diri Anda.

Mulai dari gunting rambut, facial, makeup, hingga hairspa. Semua dilakukan dengan sentuhan profesional dan kenyamanan layaknya di rumah sendiri.

Rasakan pelayanan terbaik yang memahami kebutuhan setiap wanita.
            </p>
            <div className="space-x-4">
              <a href="/booking-form">
                <button className="bg-primary text-white cursor-pointer px-6 py-2 rounded hover:bg-brown-600">
                Booking Sekarang
              </button>
              </a>
             <a href="/layanan">
               <button className="border border-brown-500 cursor-pointer text-primary px-6 py-2 rounded hover:bg-brown-100">
                Lihat Layanan
              </button>
             </a>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="/home.jpg"
              alt="Hero"
              className="rounded w-full"
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-8">Jenis Layanan Kami</h3>
          <LayananSnap />
          <button
            onClick={() => (window.location.href = "/layanan")}
            className="mt-8 bg-primary text-white px-6 py-2 rounded hover:bg-brown-600 cursor-pointer"
          >
            Lihat Semua Layanan
          </button>
        </div>
      </section>

      <ReviewSnap />
      <GaleriSnap />

      {/* Footer */}
      <Footer />
    </>
  );
}
