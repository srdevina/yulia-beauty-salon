import { useState, useEffect } from "react";
import axios from "axios";
import NavClient from "../components/NavClient";
import Footer from "../components/Footer";

export default function BookingForm() {
  const [layanan, setLayanan] = useState([]);
  const [form, setForm] = useState({
    nama_layanan: "",
    tanggal: "",
    waktu: "",
    nama: "",
    telepon: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://salon.test/layanan.php").then((res) => {
      if (res.data?.layananData) {
        setLayanan(res.data.layananData);
      }
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://salon.test/booking.php", form);
      if (res.data?.snapToken) {
        window.snap.pay(res.data.snapToken, {
          onSuccess: async function (result) {
            alert("Payment Success!");
            console.log(result);

            
            try {
              await axios.post("http://salon.test/update_booking_status.php", {
                id: result.id, 
                status: "berhasil",
              });
            } catch (err) {
              console.error("Gagal update status", err);
            }

            window.location.href =
              "https://wa.me/62895412988459?text=Halo%20Yulia%20Beauty%20Salon,%20saya%20sudah%20melakukan%20pembayaran%20booking.";
          },
          onPending: function (result) {
            alert("Waiting for payment...");
            console.log(result);
          },
          onError: function (result) {
            alert("Payment Failed!");
            console.log(result);
          },
          onClose: function () {
            alert("Anda menutup payment tanpa membayar!");
          },
        });
      } else {
        alert(res.data?.message || "Failed to create booking");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavClient />
      <div className="p-5 ">
        <p className="text-center mb-10 md:w-[600px] mx-auto text-primary">
          Silakan isi formulir di bawah ini untuk melakukan pemesanan layanan di
          Yulia Beauty Salon.
        </p>
      </div>
      <div className="max-w-3xl mx-auto p-6 bg-white  rounded mb-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="nama_layanan"
            value={form.nama_layanan}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Pilih Layanan --</option>
            {layanan.map((item) => (
              <option key={item.id} value={item.nama_layanan}>
                {item.nama_layanan}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="tanggal"
            value={form.tanggal}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="time"
            name="waktu"
            value={form.waktu}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={form.nama}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="text"
            name="telepon"
            placeholder="Nomor Telepon"
            value={form.telepon}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className=" bg-primary w-1/5 text-white py-2 rounded"
          >
            {loading ? "Memproses..." : "Kirim Booking"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
