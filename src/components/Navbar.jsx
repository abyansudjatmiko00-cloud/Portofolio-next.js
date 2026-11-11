
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

const menu = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/proyek", label: "Proyek" },
  { href: "/kontak", label: "Kontak" },
];

function subscribe(callback) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getDarkMode() {
  return localStorage.getItem("darkMode") === "true";
}

function getServerDarkMode() {
  return false;
}

export default function Navbar() {
  const pathname = usePathname();

  const darkMode = useSyncExternalStore(
    subscribe,
    getDarkMode,
    getServerDarkMode
  );

  function toggleDarkMode() {
    const modeBaru = !darkMode;

    localStorage.setItem("darkMode", String(modeBaru));
    document.documentElement.classList.toggle("dark", modeBaru);

    window.dispatchEvent(new Event("storage"));
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
            className="border-white bg-transparent text-white hover:bg-white hover:text-utama"
          >
            {darkMode ? "☀️ Terang" : "🌙 Gelap"}
          </Button>
        </div>
      </nav>
    </header>
  );
}
