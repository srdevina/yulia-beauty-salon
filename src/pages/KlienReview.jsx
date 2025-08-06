import { useEffect, useState } from "react";
import axios from "axios";

export default function KlienReview() {
  const [ulasan, setUlasan] = useState([]);
  const [visible, setVisible] = useState(3);
  const [loading, setLoading] = useState(false);

  const fetchUlasan = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://salon.test/ulasan.php");
      if (res.data.ulasanData) {
        setUlasan(res.data.ulasanData);
      } else {
        setUlasan([]);
      }
    } catch (error) {
      console.error("Gagal mengambil ulasan", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUlasan();
  }, []);

  const loadMore = () => {
    setVisible((prev) => prev + 3);
  };

  const renderStars = (rating) => {
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return (
      <span className="text-yellow-500 text-sm">
        {filledStars}
        <span className="text-gray-300">{emptyStars}</span>
      </span>
    );
  };

  return (
    <section className="bg-secondary py-12">
      <div className="max-w-7xl mx-auto px-6 text-center ">
        <h3 className="text-2xl font-bold mb-2 text-primary">
          Apa Kata Klien Kami
        </h3>
        <p className="mb-8 text-primary">
          Pengalaman nyata dari pelanggan yang merasakan pelayanan kami.
        </p>

        {loading ? (
          <p className="text-gray-500">Memuat ulasan...</p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {ulasan.length === 0 ? (
                <p className="col-span-3 text-gray-500">Belum ada ulasan</p>
              ) : (
                ulasan.slice(0, visible).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={`http://salon.test/${item.foto}`}
                        alt={item.nama}
                        className="w-12 h-12 rounded-full mr-3 object-cover border"
                      />
                      <div className="text-left">
                        <p className="font-bold">{item.nama}</p>
                        {renderStars(Number(item.rating))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">"{item.review}"</p>
                  </div>
                ))
              )}
            </div>

            {visible < ulasan.length && (
              <button
                onClick={loadMore}
                className="mt-8 bg-white border border-gray-300 px-6 py-2 rounded hover:bg-gray-100"
              >
                Lihat Lebih Banyak Ulasan
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
