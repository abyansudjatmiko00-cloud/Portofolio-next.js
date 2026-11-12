
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sudahMasuk } from "@/lib/pin";
import {
  masukAdmin,
  keluarAdmin,
  hapusProyek,
} from "./actions";
import KonfirmasiHapus from "@/components/KonfirmasiHapus";

export const metadata = {
  title: "Kelola Proyek",
};

export default async function KelolaPage({ searchParams }) {
  const sudahLogin = await sudahMasuk();
  const params = await searchParams;

  const gayaKolom =
    "w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-base font-medium text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const gayaTombol =
    "rounded-lg border border-blue-700 bg-blue-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-blue-700";

  if (!sudahLogin) {
    return (
      <main className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-xl border-2 border-gray-300 bg-white p-6 shadow-sm">
          <h1 className="mb-3 text-3xl font-bold text-gray-900">
            Login Admin
          </h1>

          <p className="mb-6 text-base text-gray-600">
            Masukkan PIN untuk mengelola proyek portofolio.
          </p>

          {params?.error === "pin" && (
            <p className="mb-4 rounded-lg border border-red-300 bg-red-100 p-3 text-red-700">
              PIN yang kamu masukkan salah.
            </p>
          )}

          <form action={masukAdmin} className="space-y-4">
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                PIN Admin
              </label>

              <input
                type="password"
                name="pin"
                placeholder="Masukkan PIN admin"
                required
                className={gayaKolom}
              />
            </div>

            <button
              type="submit"
              className={`${gayaTombol} w-full`}
            >
              Masuk Admin
            </button>
          </form>
        </div>
      </main>
    );
  }

  const { data: proyek, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil proyek:", error.message);

    return (
      <main className="p-8">
        <p className="font-semibold text-red-700">
          Gagal mengambil data proyek.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Kelola Proyek
          </h1>

          <p className="mt-2 text-gray-600">
            Tambah, edit, dan hapus proyek portofolio.
          </p>
        </div>

        <form action={keluarAdmin}>
          <button className="rounded-lg border border-gray-300 bg-white px-5 py-2 font-semibold text-gray-800 hover:bg-gray-100">
            Keluar
          </button>
        </form>
      </div>

      <Link
        href="/kelola/proyek/baru"
        className={gayaTombol + " inline-block"}
      >
        + Tambah Proyek
      </Link>

      {params?.error && params.error !== "pin" && (
        <p className="mt-4 rounded-lg border border-red-300 bg-red-100 p-3 text-red-700">
          Terjadi kesalahan. Silakan periksa data proyek.
        </p>
      )}

      <div className="mt-8 space-y-4">
        {proyek.length === 0 ? (
          <p className="text-gray-700">Belum ada proyek.</p>
        ) : (
          proyek.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border-2 border-gray-300 bg-white p-5 shadow-sm"
            >
              <div>
                <h2 className="font-bold text-gray-900">
                  {item.judul}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  {item.kategori} · Minggu {item.minggu}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/kelola/proyek/${item.id}`}
                  className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-50"
                >
                  Edit
                </Link>

                <KonfirmasiHapus
                  id={item.id}
                  aksi={hapusProyek}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
