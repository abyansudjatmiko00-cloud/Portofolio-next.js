
import Link from "next/link";
import { redirect } from "next/navigation";
import FormProyek from "@/components/FormProyek";
import { sudahMasuk } from "@/lib/pin";
import { tambahProyek } from "../../actions";

export default async function TambahProyekPage() {
  if (!(await sudahMasuk())) {
    redirect("/kelola");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/kelola"
        className="text-sm font-semibold text-blue-600 hover:underline"
      >
        ← Kembali ke Kelola Proyek
      </Link>

      <h1 className="mb-2 mt-6 text-3xl font-bold">
        Tambah Proyek Baru
      </h1>

      <p className="mb-8 text-gray-600">
        Isi informasi proyek yang ingin ditambahkan ke portofolio.
      </p>

      <FormProyek
        aksi={tambahProyek}
        labelTombol="Simpan Proyek"
      />
    </main>
  );
}
