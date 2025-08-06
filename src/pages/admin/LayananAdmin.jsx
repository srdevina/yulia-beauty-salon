import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "./AdminLayout";

const LayananAdmin = () => {
  const [form, setForm] = useState({
    nama_layanan: "",
    harga: "",
    deskripsi: "",
    foto: null,
  });

  const [layananList, setLayananList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchLayanan = async () => {
    try {
      const res = await axios.get("http://salon.test/layanan.php");
      if (res.data?.layananData) {
        setLayananList(res.data.layananData);
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data layanan");
    }
  };

  useEffect(() => {
    fetchLayanan();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      foto: e.target.files[0] || null,
    }));
  };

  const resetForm = () => {
    setForm({
      nama_layanan: "",
      harga: "",
      deskripsi: "",
      foto: null,
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.foto && !editMode) {
      toast.error("Harap pilih foto!");
      return;
    }

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    if (editMode) {
      formData.append("id", editId); // kirim ID untuk update
    }

    setLoading(true);
    try {
      const res = await axios.post("http://salon.test/layanan.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.result?.includes("Error")) {
        toast.error(res.data.result);
      } else {
        toast.success(editMode ? "Layanan berhasil diperbarui!" : "Layanan berhasil ditambahkan!");
        fetchLayanan();
        resetForm();
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.result ||
          "Terjadi kesalahan saat menyimpan layanan."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (layanan) => {
    setForm({
      nama_layanan: layanan.nama_layanan,
      harga: layanan.harga,
      deskripsi: layanan.deskripsi,
      foto: null,
    });
    setEditMode(true);
    setEditId(layanan.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus layanan ini?")) return;
    try {
      const res = await axios.delete(`http://salon.test/layanan.php?id=${id}`);
      toast.success(res.data?.result || "Layanan berhasil dihapus!");
      fetchLayanan();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus layanan.");
    }
  };

  // Pagination
  const totalPages = Math.ceil(layananList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = layananList.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">
            {editMode ? "Edit Layanan" : "Tambah Layanan"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Nama Layanan</label>
              <input
                type="text"
                name="nama_layanan"
                value={form.nama_layanan}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Harga</label>
              <input
                type="number"
                name="harga"
                value={form.harga}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Deskripsi</label>
              <textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows="3"
                required
              ></textarea>
            </div>

            <div>
              <label className="block font-medium mb-1">Foto</label>
              <input
                type="file"
                name="foto"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full border border-gray-300 rounded px-3 py-2"
                {...(!editMode && { required: true })}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : editMode ? "Update" : "Simpan"}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-opacity-90"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List with Pagination */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Daftar Layanan</h2>
          {currentItems.length === 0 ? (
            <p className="text-gray-500">Belum ada layanan</p>
          ) : (
            <>
              <table className="w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Foto</th>
                    <th className="border p-2">Nama</th>
                    <th className="border p-2">Harga</th>
                    <th className="border p-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((layanan) => (
                    <tr key={layanan.id}>
                      <td className="border p-2">
                        <img
                          src={`http://salon.test/${layanan.foto}`}
                          alt={layanan.nama_layanan}
                          className="h-12 object-cover"
                        />
                      </td>
                      <td className="border p-2">{layanan.nama_layanan}</td>
                      <td className="border p-2">{layanan.harga}</td>
                      <td className="border p-2 space-x-2">
                        <button
                          onClick={() => handleEdit(layanan)}
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(layanan.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center mt-4 gap-2">
                <button
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => changePage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-primary text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default LayananAdmin;
