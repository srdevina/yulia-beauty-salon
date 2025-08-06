import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const BookingAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://salon.test/getbooking.php");
      if (res.data?.bookingData) {
        setBookings(res.data.bookingData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const openWhatsApp = (phone) => {
    const phoneNumber = phone.replace(/^0/, "62");
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = bookings.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white p-4 md:p-6 rounded shadow">
        <h2 className="text-lg md:text-xl font-bold mb-4">Riwayat Booking</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">Belum ada booking</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Nama</th>
                    <th className="border p-2">Layanan</th>
                    <th className="border p-2">Tanggal</th>
                    <th className="border p-2">Waktu</th>
                    <th className="border p-2">Telepon</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border p-2">{item.nama}</td>
                      <td className="border p-2">{item.nama_layanan}</td>
                      <td className="border p-2">{item.tanggal}</td>
                      <td className="border p-2">{item.waktu}</td>
                      <td className="border p-2">
                        <button
                          onClick={() => openWhatsApp(item.telepon)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs sm:text-sm"
                        >
                          WhatsApp
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center items-center mt-4 gap-2">
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
    </AdminLayout>
  );
};

export default BookingAdmin;
