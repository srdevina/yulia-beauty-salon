import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "./AdminLayout";

export default function UlasanAdmin() {
  const [ulasan, setUlasan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    id: null,
    nama: "",
    review: "",
    rating: 5,
    foto: null,
  });
  const [editMode, setEditMode] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(ulasan.length / perPage);

  const fetchUlasan = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://salon.test/ulasan.php");
      if (res.data.ulasanData) {
        setUlasan(res.data.ulasanData);
      } else {
        setUlasan([]);
      }
    } catch {
      toast.error("Gagal mengambil data ulasan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUlasan();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, foto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", form.nama);
    formData.append("review", form.review);
    formData.append("rating", form.rating);
    if (form.foto) {
      formData.append("foto", form.foto);
    }
    try {
      if (editMode) {
        formData.append("id", form.id);
        const res = await axios.post("http://salon.test/ulasan.php", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(res.data.message || "Ulasan berhasil diupdate");
      } else {
        const res = await axios.post("http://salon.test/ulasan.php", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(res.data.message || "Ulasan berhasil ditambahkan");
      }
    } catch {
      toast.error("Gagal menyimpan ulasan");
    }
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      nama: item.nama,
      review: item.review,
      rating: item.rating,
      foto: null,
    });
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus ulasan ini?")) return;
    try {
      const res = await axios.delete(`http://salon.test/ulasan.php?id=${id}`);
      toast.success(res.data.message || "Ulasan berhasil dihapus");
      fetchUlasan();
    } catch {
      toast.error("Gagal menghapus ulasan");
    }
  };

  const paginatedData = ulasan.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <AdminLayout>
      <div className="p-6 bg-white rounded shadow space-y-6">
        <h2 className="text-xl font-bold">
          {editMode ? "Edit Ulasan" : "Tambah Ulasan"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Nama"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <textarea
            name="review"
            value={form.review}
            onChange={handleChange}
            placeholder="Tulis ulasan..."
            className="w-full border px-3 py-2 rounded"
            required
          />
          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Bintang
              </option>
            ))}
          </select>
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
            {editMode ? "Update Ulasan" : "Tambah Ulasan"}
          </button>
        </form>
        {loading ? (
          <p>Memuat...</p>
        ) : ulasan.length === 0 ? (
          <p className="text-gray-500">Belum ada ulasan</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Foto</th>
                    <th className="border px-4 py-2">Nama</th>
                    <th className="border px-4 py-2">Review</th>
                    <th className="border px-4 py-2">Rating</th>
                    <th className="border px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item) => (
                    <tr key={item.id}>
                      <td className="border px-4 py-2 text-center">
                        {item.foto ? (
                          <img
                            src={`http://salon.test/${item.foto}`}
                            alt={item.nama}
                            className="w-12 h-12 rounded-full object-cover mx-auto"
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="border px-4 py-2">{item.nama}</td>
                      <td className="border px-4 py-2">{item.review}</td>
                      <td className="border px-4 py-2 text-center">
                        {"★".repeat(item.rating)}
                      </td>
                      <td className="border px-4 py-2 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-2 mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
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
