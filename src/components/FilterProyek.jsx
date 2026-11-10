
"use client";

import { useState } from "react";
import ProyekCard from "@/components/ProyekCard";

export default function FilterProyek({ dataProyek }) {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [kataKunci, setKataKunci] = useState("");

  const daftarKategori = [
    "Semua",
    ...new Set(dataProyek.map((item) => item.kategori)),
  ];

  const hasilFilter = dataProyek.filter((item) => {
    const cocokKategori =
      kategoriAktif === "Semua" ||
      item.kategori === kategoriAktif;

    const cocokPencarian =
      item.judul.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(kataKunci.toLowerCase());

    return cocokKategori && cocokPencarian;
  });

  function bersihkanFilter() {
    setKategoriAktif("Semua");
    setKataKunci("");
  }

  return (
    <section>
      <div className="mt-8 flex flex-wrap gap-3">
        {daftarKategori.map((kategori) => (
          <button
            key={kategori}
            onClick={() => setKategoriAktif(kategori)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              kategoriAktif === kategori
                ? "bg-utama text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {kategori}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          placeholder="Cari nama atau deskripsi proyek..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-utama"
        />

        <button
          onClick={bersihkanFilter}
          className="rounded-lg bg-aksen px-5 py-3 font-semibold text-white hover:opacity-90"
        >
          Reset
        </button>
      </div>

      <p className="mt-5 text-sm text-gray-600">
        Menampilkan {hasilFilter.length} proyek.
      </p>

      {hasilFilter.length > 0 ? (
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {hasilFilter.map((item) => (
            <ProyekCard key={item.slug} proyek={item} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-lg bg-gray-100 p-6 text-center text-gray-600">
          Proyek tidak ditemukan.
        </p>
      )}
    </section>
  );
}
