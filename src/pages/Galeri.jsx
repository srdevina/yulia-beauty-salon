import { useEffect, useState } from "react";
import axios from "axios";
import NavClient from "../components/NavClient";
import Footer from "../components/Footer";

export default function Galeri() {
  const [galeri, setGaleri] = useState([]);
  const [visible, setVisible] = useState(6);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Ambil data dari galeri.php
  const fetchGaleri = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://salon.test/galeri.php");
      if (res.data.galeriData) {
        setGaleri(res.data.galeriData);
      } else {
        setGaleri([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  const loadMore = () => {
    setVisible((prev) => prev + 6);
  };

  return (
    <>
      <NavClient />
      <div className="bg-white min-h-screen p-6">
        <p className="text-primary text-center">Lihat hasil karya tim profesional kami yang telah membuat banyak klien puas.</p>
        <h1 className="text-2xl font-bold text-center mb-8 text-primary">
          Galeri
        </h1>

        {loading ? (
          <p className="text-center">Memuat galeri...</p>
        ) : galeri.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada foto galeri.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galeri.slice(0, visible).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(`http://salon.test/${item.foto}`)}
                  className="rounded overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
                >
                  <img
                    src={`http://salon.test/${item.foto}`}
                    alt="Galeri"
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>

            {visible < galeri.length && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90"
                >
                  Lihat Lebih Banyak
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-pointer"
        >
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] rounded shadow-lg"
          />
        </div>
      )}

      <Footer />
    </>
  );
}
