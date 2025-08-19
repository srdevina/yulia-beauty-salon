import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GaleriSnap = () => {
  const [galeri, setGaleri] = useState([]);
  const navigate = useNavigate();

  const fetchGaleri = async () => {
    try {
      const res = await axios.get("http://salon.test/galeri.php");
      if (res.data.galeriData) {
        setGaleri(res.data.galeriData.slice(0, 3));
      } else {
        setGaleri([]);
      }
    } catch (error) {
      console.error("Gagal mengambil galeri", error);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-center text-primary">Karya terbaik kami dalam berbagai layanan kecantikan.</p>
        <h3 className="text-2xl font-bold mb-8 text-primary">Galeri Hasil Salon</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {galeri.length === 0 ? (
            <p className="col-span-3 text-gray-500">Belum ada foto galeri</p>
          ) : (
            galeri.map((item) => (
              <img
                key={item.id}
                src={`http://salon.test/${item.foto}`}
                alt="Galeri"
                className="rounded object-cover w-full h-72"
              />
            ))
          )}
        </div>
        <button
          onClick={() => navigate("/galeri")}
          className="mt-8 bg-primary text-white px-6 py-2 rounded hover:bg-brown-600 cursor-pointer"
        >
          Lihat Galeri Lengkap
        </button>
      </div>
    </section>
  );
};

export default GaleriSnap;
