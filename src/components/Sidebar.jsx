import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Layanan", path: "/layanan-admin" },
    { name: "Galeri", path: "/galeri-admin" },
    { name: "Reviews", path: "/reviews-admin" },
    { name: "History Booking", path: "/history-booking" },
    { name: "Kontak", path: "/kontak-admin" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden p-4 bg-primary text-white flex justify-between items-center">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <button onClick={() => setOpen(true)}>
          <HiMenu size={28} />
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      {open && (
        <div className="fixed inset-0 bg-primary text-white z-50 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <button onClick={() => setOpen(false)}>
              <HiX size={28} />
            </button>
          </div>
          <nav className="space-y-2 flex-1 overflow-y-auto">
            {menuItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className="block py-2 px-4 rounded hover:bg-primary/80"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 rounded mt-4"
          >
            Logout
          </button>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:block bg-primary text-white w-64 p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="block py-2 px-4 rounded hover:bg-primary/80"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 rounded mt-6 w-full"
        >
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
