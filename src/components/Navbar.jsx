
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menu = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/proyek", label: "Proyek" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const tersimpan = localStorage.getItem("darkMode") === "true";
    setDarkMode(tersimpan);
    document.documentElement.classList.toggle("dark", tersimpan);
  }, []);

  function toggleDarkMode() {
    const modeBaru = !darkMode;

    setDarkMode(modeBaru);
    localStorage.setItem("darkMode", String(modeBaru));
    document.documentElement.classList.toggle("dark", modeBaru);
  }

  return (
    <header className="bg-utama text-white">
      <nav className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-xl font-bold">
          Muhammad Abyan
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {menu.map((item) => {
              let kelas = "text-gray-200 hover:text-white";
              let aktif = pathname.startsWith(item.href);

              if (item.href === "/") {
                aktif = pathname === "/";
              }

              if (aktif) {
                kelas = "font-bold text-white underline underline-offset-8";
              }

              return (
                <li key={item.href}>
                  <Link href={item.href} className={kelas}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            onClick={toggleDarkMode}
            className="rounded-lg border border-white px-3 py-2 text-sm font-semibold hover:bg-white hover:text-utama"
          >
            {darkMode ? "☀️ Terang" : "🌙 Gelap"}
          </button>
        </div>
      </nav>
    </header>
  );
}
