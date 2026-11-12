
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import FormProyek from "@/components/FormProyek";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sudahMasuk } from "@/lib/pin";
import { ubahProyek } from "../../actions";

export default async function EditProyekPage({ params }) {
  if (!(await sudahMasuk())) {
    redirect("/kelola");
  }

  const { id } = await params;

  const { data: proyek, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Gagal mengambil proyek:", error.message);
    throw new Error("Gagal mengambil data proyek.");
  }

  if (!proyek) {
    notFound();
  }

  const aksiEdit = ubahProyek.bind(null, id);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/kelola"
        className="text-sm font-semibold text-blue-600 hover:underline"
      >
        ← Kembali ke Kelola Proyek
      </Link>

      <h1 className="mb-2 mt-6 text-3xl font-bold">
        Edit Proyek
      </h1>

      <p className="mb-8 text-gray-600">
        Perbarui informasi proyek berikut.
      </p>

      <FormProyek
        proyek={proyek}
        aksi={aksiEdit}
        labelTombol="Simpan Perubahan"
      />
    </main>
  );
}
