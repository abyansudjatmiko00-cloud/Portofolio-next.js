
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const isian =
  "mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-800";

export default function FormKontak() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    nomorHP: "",
    keperluan: "",
    pesan: "",
  });

  const [error, setError] = useState({});
  const [berhasil, setBerhasil] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((sebelumnya) => ({
      ...sebelumnya,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errorBaru = {};

    if (form.nama.trim().length < 3) {
      errorBaru.nama = "Nama minimal 3 karakter.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errorBaru.email = "Masukkan alamat email yang valid.";
    }

    if (!/^[0-9]{10,15}$/.test(form.nomorHP)) {
      errorBaru.nomorHP = "Nomor HP harus 10–15 digit angka.";
    }

    if (!form.keperluan) {
      errorBaru.keperluan = "Silakan pilih keperluan.";
    }

    if (form.pesan.trim().length < 10) {
      errorBaru.pesan = "Pesan minimal 10 karakter.";
    }

    setError(errorBaru);
    setBerhasil(false);

    if (Object.keys(errorBaru).length === 0) {
      setBerhasil(true);
      setForm({
        nama: "",
        email: "",
        nomorHP: "",
        keperluan: "",
        pesan: "",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nama" className="block font-semibold">
          Nama lengkap
        </label>
        <input
          type="text"
          id="nama"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Contoh: Budi Santoso"
          className={isian}
        />
        {error.nama && (
          <p className="mt-1 text-sm text-red-600">{error.nama}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="nama@contoh.com"
          className={isian}
        />
        {error.email && (
          <p className="mt-1 text-sm text-red-600">{error.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="nomorHP" className="block font-semibold">
          Nomor HP
        </label>
        <input
          type="tel"
          id="nomorHP"
          name="nomorHP"
          value={form.nomorHP}
          onChange={handleChange}
          placeholder="Contoh: 081234567890"
          className={isian}
        />
        {error.nomorHP && (
          <p className="mt-1 text-sm text-red-600">{error.nomorHP}</p>
        )}
      </div>

      <div>
        <label htmlFor="keperluan" className="block font-semibold">
          Keperluan
        </label>
        <select
          id="keperluan"
          name="keperluan"
          value={form.keperluan}
          onChange={handleChange}
          className={isian}
        >
          <option value="">Pilih keperluan</option>
          <option value="kerja-sama">Ajakan kerja sama</option>
          <option value="pertanyaan">Pertanyaan</option>
          <option value="lainnya">Lainnya</option>
        </select>
        {error.keperluan && (
          <p className="mt-1 text-sm text-red-600">{error.keperluan}</p>
        )}
      </div>

      <div>
        <label htmlFor="pesan" className="block font-semibold">
          Pesan
        </label>
        <textarea
          id="pesan"
          name="pesan"
          rows={5}
          maxLength={300}
          value={form.pesan}
          onChange={handleChange}
          placeholder="Tulis pesanmu (maksimal 300 karakter)"
          className={isian}
        />
        {error.pesan && (
          <p className="mt-1 text-sm text-red-600">{error.pesan}</p>
        )}
      </div>

      <Button type="submit" className="bg-utama text-white hover:opacity-90">
        Kirim Pesan
      </Button>

      {berhasil && (
        <p className="rounded-lg bg-green-100 p-3 text-green-800">
          Pesan berhasil divalidasi! Terima kasih sudah mengisi form.
        </p>
      )}
    </form>
  );
}
