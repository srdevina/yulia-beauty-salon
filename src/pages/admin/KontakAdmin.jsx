import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "./AdminLayout";

export default function KontakAdmin() {
  const [kontak, setKontak] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ambil data dari API
  const fetchKontak = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://salon.test/kontak.php");
      if (res.data.kontakData) {
        setKontak(res.data.kontakData);
      } else {
        setKontak([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengambil data kontak");
    } finally {
      setLoading(false);
    }
  };

  // Hapus kontak
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pesan ini?")) return;
    try {
      const res = await axios.delete(`http://salon.test/kontak.php?id=${id}`);
      toast.success(res.data.result || "Pesan berhasil dihapus");
      fetchKontak();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus pesan");
    }
  };

  useEffect(() => {
    fetchKontak();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Daftar Pesan Kontak</h2>

        {loading ? (
          <p>Loading...</p>
        ) : kontak.length === 0 ? (
          <p className="text-gray-500">Tidak ada pesan masuk</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2">No</th>
                    <th className="border px-4 py-2">Nama</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Pesan</th>
                    <th className="border px-4 py-2">Tanggal</th>
                    <th className="border px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {kontak.map((item, index) => (
                    <tr key={item.id}>
                      <td className="border px-4 py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="border px-4 py-2">{item.nama}</td>
                      <td className="border px-4 py-2">{item.email}</td>
                      <td className="border px-4 py-2">{item.pesan}</td>
                      <td className="border px-4 py-2">
                        {item.created_at || "-"}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
              {kontak.map((item, index) => (
                <div
                  key={item.id}
                  className="border border-gray-300 rounded p-4 shadow-sm"
                >
                  <p className="font-bold text-primary">
                    {index + 1}. {item.nama}
                  </p>
                  <p className="text-sm text-gray-600">{item.email}</p>
                  <p className="mt-2">{item.pesan}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {item.created_at || "-"}
                  </p>
                  <div className="mt-3">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
