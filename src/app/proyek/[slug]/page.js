import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { proyek } from "@/data/proyek";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = proyek.find((p) => p.slug === slug);

  if (!item) {
    return { title: "Proyek tidak ditemukan" };
  }
  return { title: item.judul, description: item.deskripsi };
}

export default async function DetailProyek({ params }) {
  const { slug } = await params;
  const item = proyek.find((p) => p.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <Link href="/proyek" className="text-sm font-semibold text-aksen hover:underline">
        &larr; Kembali ke daftar proyek
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-utama md:text-4xl">{item.judul}</h1>
      <p className="mt-2 text-gray-600">
        {item.kategori} &middot; Dibuat tahun {item.tahun}
      </p>
      <Image
        src={item.gambar}
        alt={`Tangkapan layar ${item.judul}`}
        width={640}
        height={420}
        loading="eager"
        className="mt-6 h-auto w-full rounded-xl border border-gray-200"
      />
      <p className="mt-6 text-lg">{item.deskripsi}</p>

      <h2 className="mt-8 text-2xl font-bold text-utama">Fitur Utama</h2>
      <ul className="mt-3 list-disc pl-5">
        {item.fitur.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <h2 className="mt-8 text-2xl font-bold text-utama">Teknologi</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.teknologi.map((t) => (
          <span key={t} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-utama border border-gray-200">
            {t}
          </span>
        ))}
      </div>

      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block rounded-lg bg-utama px-5 py-2 font-semibold text-white"
      >
        Kunjungi website ↗
      </a>
    </main>
  );
}
