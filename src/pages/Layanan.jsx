import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./admin/AdminLayout";
import NavClient from "../components/NavClient";
import Footer from "../components/Footer";

export default function Layanan() {
  const [layanan, setLayanan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLayanan = async () => {
      try {
        const res = await axios.get("http://salon.test/layanan.php");
        if (res.data?.layananData) {
          setLayanan(res.data.layananData);
        } else {
          setLayanan([]);
        }
      } catch (err) {
        console.error("Error fetching layanan:", err);
        setLayanan([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLayanan();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading layanan...</div>
    );
  }

  const goBooking = ()=>{
    window.location.href = "/booking-form"
  }

  return (
    <>
      <NavClient />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {layanan.length === 0 ? (
          <p className="text-center text-gray-500">
            Tidak ada layanan tersedia.
          </p>
        ) : (
          <>
          <h1 className="text-center text-5xl text-primary mb-12 font-bold ">Layanan</h1>
            <p className="text-center text-primary mb-10">
              Kami menawarkan berbagai perawatan kecantikan yang dirancang untuk
              memenuhi kebutuhan Anda.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {layanan.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={`http://salon.test/${item.foto}`}
                    alt={item.nama_layanan}
                    className="w-full h-48 object-cover"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/600x400")
                    }
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-text">
                      {item.nama_layanan}
                    </h3>
                    <p className=" text-sm mb-3 text-primary">
                      {item.deskripsi}
                    </p>
                    <p className="font-semibold text-primary">
                      Mulai Rp {parseInt(item.harga).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking Button */}
            <div className="text-center mt-8">
              <button className="bg-primary/90 hover:bg-primary cursor-pointer text-white px-6 py-2 rounded hover:bg-brown-800 transition" onClick={goBooking}>
                Booking Sekarang
              </button>
            </div>
          </>
        )}
      </div>
      <Footer/>
    </>
  );
}
