import Image from "next/image";
import Link from "next/link";

export default function ProyekCard({ proyek }) {
  return (
    <Link
      href={`/proyek/${proyek.slug}`}
      className="block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md"
    >
      <Image
        src={proyek.gambar}
        alt={`Tangkapan layar ${proyek.judul}`}
        width={640}
        height={420}
        loading="eager"
        className="h-auto w-full"
      />
      <div className="p-5">
        <span className="rounded-full bg-latar px-3 py-1 text-xs font-semibold text-utama">{proyek.kategori}</span>
        <h3 className="mt-3 text-lg font-semibold text-utama">{proyek.judul}</h3>
        <p className="mt-1 text-sm text-gray-600">{proyek.deskripsi}</p>
      </div>
    </Link>
  );
}
