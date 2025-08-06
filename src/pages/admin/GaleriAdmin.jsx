import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "./AdminLayout";

import { FaTrashAlt } from "react-icons/fa";


export default function GaleriAdmin() {
  const [galeri, setGaleri] = useState([]);
  const [form, setForm] = useState({
    judul: "",
    foto: null,
  });
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Ambil data galeri dari API
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
      toast.error("Gagal mengambil data galeri");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  // Handle input text
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setForm({ ...form, foto: e.target.files[0] });
  };

  // Tambah foto
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.foto) {
      toast.error("Harap pilih foto");
      return;
    }

    const formData = new FormData();
    formData.append("judul", form.judul);
    formData.append("foto", form.foto);

    try {
      const res = await axios.post("http://salon.test/galeri.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.result || "Foto berhasil ditambahkan");
      setForm({ judul: "", foto: null });
      fetchGaleri();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menambahkan foto");
    }
  };

  // Hapus foto
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus foto ini?")) return;
    try {
      const res = await axios.delete(`http://salon.test/galeri.php?id=${id}`);
      toast.success(res.data.result || "Foto berhasil dihapus");
      fetchGaleri();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus foto");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(galeri.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = galeri.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <AdminLayout>
      <div className="p-6 bg-white rounded shadow space-y-6">
        <h2 className="text-xl font-bold">Kelola Galeri</h2>

        {/* Form Tambah */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="judul"
            value={form.judul}
            onChange={handleChange}
            placeholder="Judul (opsional)"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="file"
            name="foto"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            Tambah Foto
          </button>
        </form>

 
        {loading ? (
          <p>Memuat...</p>
        ) : galeri.length === 0 ? (
          <p className="text-gray-500">Belum ada foto</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded shadow hover:shadow-lg transition"
                >
                  <img
                    src={`http://salon.test/${item.foto}`}
                    alt={item.judul || "Galeri"}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3 flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {item.judul || "-"}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs cursor-pointer"
                    >
                      <FaTrashAlt />

                    </button>
                  </div>
                </div>
              ))}
            </div>

            
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : "bg-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
