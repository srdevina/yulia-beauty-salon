import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import NavClient from "../components/NavClient";
import Footer from "../components/Footer";

export default function Kontak() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    pesan: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", form.nama);
    formData.append("email", form.email);
    formData.append("pesan", form.pesan);

    try {
      const res = await axios.post("http://salon.test/kontak.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status == 200) {
        toast.success("Pesan berhasil dikirim!");
        setForm({ nama: "", email: "", pesan: "" });
      } else {
        toast.error(res.data.message || "Gagal mengirim pesan.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat mengirim pesan.");
    }
  };

  return (
    <>
      <NavClient />
      <div className="bg-white">
        <div className=" w-full mt-5">
          <div className="p-5 ">
            <p className="text-center mb-10 md:w-[600px] mx-auto text-primary">
              Kami siap membantu Anda! Silakan hubungi kami melalui informasi di
              bawah ini atau isi formulir kontak.
            </p>
          </div>
          {/* Informasi Kontak & Form */}
          <div className="flex md:flex-row flex-col justify-center mx-auto gap-10 mb-10 p-5">
            {/* Informasi Kontak */}
            <div>
              <h2 className="text-lg font-bold mb-4 text-primary">
                Informasi Kontak
              </h2>
              <p className="mb-2">
                📍 Jl. Pulau Galang No. 15, Kelapa Gading Barat, Jakarta Utara
              </p>
              <p className="mb-2">📞 0812 6866 6693</p>
              <p>📧 yuliabeautysalonjkt@gmail.com</p>
            </div>

            {/* Form Kontak */}
            <div>
              <h2 className="text-lg font-bold mb-4">Formulir Kontak</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Nama"
                  required
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full border rounded px-3 py-2"
                />
                <textarea
                  name="pesan"
                  value={form.pesan}
                  onChange={handleChange}
                  placeholder="Pesan"
                  rows="4"
                  required
                  className="w-full border rounded px-3 py-2"
                ></textarea>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-brown-700"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className=" bg-secondary p-5 py-12">
            <h2 className="text-center md:text-4xl font-bold mb-4 text-primary">
              Temukan Kami
            </h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.7845482335606!2d106.88591927316634!3d-6.1596035603662616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5dbd58b0fab%3A0xb4dbb5dcb37ca8c2!2sYulia%20Beauty%20Salon%20(Khusus%20Wanita)%20Get%20Beauty%20Kelapa%20Gading!5e0!3m2!1sen!2sid!4v1754243999158!5m2!1sen!2sid"
              loading="lazy"
              className="mx-auto md:w-[600px] md:h-[450px]"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
