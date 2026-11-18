
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const menu = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/proyek", label: "Proyek" },
  { href: "/buku-tamu", label: "Buku Tamu" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const modeTersimpan =
      localStorage.getItem("darkMode") === "true";

    setDarkMode(modeTersimpan);
    document.documentElement.classList.toggle(
      "dark",
      modeTersimpan
    );
  }, []);

  function toggleDarkMode() {
    const modeBaru = !darkMode;

    setDarkMode(modeBaru);
    localStorage.setItem("darkMode", String(modeBaru));

    document.documentElement.classList.toggle(
      "dark",
      modeBaru
    );
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
              const aktif =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={
                      aktif
                        ? "font-bold text-white underline underline-offset-8"
                        : "text-gray-200 hover:text-white"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Button
            onClick={toggleDarkMode}
            variant="outline"
            className="border-white bg-transparent !text-white hover:bg-white hover:!text-utama"
          >
            {darkMode ? "Mode Terang" : "Mode Gelap"}
          </Button>
        </div>
      </nav>
    </header>
  );
}
