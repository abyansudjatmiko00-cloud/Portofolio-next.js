
import { supabase } from "@/lib/supabase";
import FilterProyek from "@/components/FilterProyek";

export const metadata = {
  title: "Proyek",
  description: "Daftar proyek website karya Muhammad Abyan Sudjatmiko.",
};

export default async function DaftarProyek() {
  const { data: proyek, error } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Gagal mengambil data proyek:", error.message);

    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold">Proyek Saya</h1>
        <p className="mt-4 text-red-500">
          Gagal mengambil data proyek dari Supabase.
        </p>
      </main>
    );
  }

  const dataProyek = (proyek || []).map((item) => ({
    ...item,
    gambar: item.gambar_url,
  }));

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-utama md:text-4xl">
        Proyek Saya
      </h1>

      <p className="mt-3 text-lg text-gray-700">
        Beberapa proyek yang pernah saya kerjakan selama belajar.
        Klik kartu untuk melihat detailnya.
      </p>

      <FilterProyek dataProyek={dataProyek} />
    </main>
  );
}
