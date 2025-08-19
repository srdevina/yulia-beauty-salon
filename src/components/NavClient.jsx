const NavClient = () => {
  return (
    <>
      <header className="w-full bg-[#F9F8F6F2]">
        <div className="w-full mx-auto flex justify-between items-center py-4 px-6">
          <a href="/"><img src="/logo.png" alt="" /></a>
          <nav className="space-x-6 ">
            <a href="/" className="text-primary">
              Dashboard            
              </a>
            <a href="/layanan" className="text-primary">
              Layanan
            </a>
            <a href="/galeri" className="text-primary">
              Galeri
            </a>
            <a href="/ulasan" className="text-primary">
              Ulasan
            </a>
            <a href="/tentang-kami" className="text-primary">
              Tentang Kami
            </a>
            <a href="/kontak" className="text-primary">
              Kontak
            </a>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavClient;
