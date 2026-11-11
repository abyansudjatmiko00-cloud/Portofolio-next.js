
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

async function getProyek(slug) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Gagal mengambil detail proyek:", error.message);
    throw new Error("Gagal mengambil data proyek.");
  }

  return data;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getProyek(slug);

  if (!item) {
    return { title: "Proyek tidak ditemukan" };
  }

  return {
    title: item.judul,
    description: item.deskripsi,
  };
}

export default async function DetailProyek({ params }) {
  const { slug } = await params;
  const item = await getProyek(slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <Link
        href="/proyek"
        className="text-sm font-semibold text-aksen hover:underline"
      >
        &larr; Kembali ke daftar proyek
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-utama md:text-4xl">
        {item.judul}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{item.kategori}</Badge>
        <span className="text-sm text-gray-600">
          Minggu {item.minggu}
        </span>
      </div>

      {item.gambar_url && (
        <Image
          src={item.gambar_url}
          alt={`Tangkapan layar ${item.judul}`}
          width={1200}
          height={800}
          unoptimized
          className="mt-6 h-auto w-full rounded-xl border border-gray-200"
        />
      )}

      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-utama">
            Deskripsi Proyek
          </h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            {item.deskripsi}
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
