import React, { useEffect, useState } from "react";
import axios from "axios";

const LayananSnap = () => {
  const [layanan, setLayanan] = useState([]);
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
      }
    };

    fetchLayanan();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {layanan.slice(-3).map((item) => (
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
              <p className=" text-sm mb-3 text-primary">{item.deskripsi}</p>
              <p className="font-semibold text-primary">
                Mulai Rp {parseInt(item.harga).toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LayananSnap;
