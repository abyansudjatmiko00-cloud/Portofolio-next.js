"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/proyek", label: "Proyek" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-utama text-white">
      <nav className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-xl font-bold">
          Muhammad Abyan
        </Link>
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
      </nav>
    </header>
  );
}
