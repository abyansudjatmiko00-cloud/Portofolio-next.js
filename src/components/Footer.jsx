export default function Footer() {
  const tahun = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-utama p-6 text-center text-latar">
      <p>&copy; {tahun} Muhammad Abyan Sudjatmiko. Dibuat dengan Next.js di Kelas Industri UBIG.</p>
    </footer>
  );
}
