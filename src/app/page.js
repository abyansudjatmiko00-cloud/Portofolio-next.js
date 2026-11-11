
import Link from "next/link";
import Hero from "@/components/Hero";
import ProyekCard from "@/components/ProyekCard";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const [skillsResult, proyekResult] = await Promise.all([
    supabase
      .from("skills")
      .select("*")
      .order("created_at", { ascending: true }),

    supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  if (skillsResult.error) {
    console.error("Gagal mengambil skills:", skillsResult.error.message);
  }

  if (proyekResult.error) {
    console.error("Gagal mengambil proyek:", proyekResult.error.message);
  }

  const skills = skillsResult.data || [];
  const proyekTerbaru = proyekResult.data || [];

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10">
      <Hero
        nama="Muhammad Abyan Sudjatmiko"
        tagline="Siswa kelas XI SMK Negeri 1 Pasuruan, calon Junior Web Developer di Kelas Industri UBIG."
      />

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-utama">
          Keahlian
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {skills.map((skill) => (
            <Card key={skill.id}>
              <CardContent className="flex items-center justify-between gap-3 p-5">
                <h3 className="font-semibold text-utama">
                  {skill.nama}
                </h3>

                <Badge variant="secondary">
                  {skill.level}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {skills.length === 0 && (
          <p className="text-gray-600">
            Belum ada data keahlian.
          </p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-utama">
          Proyek Terbaru
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {proyekTerbaru.map((item) => (
            <ProyekCard key={item.id} proyek={item} />
          ))}
        </div>

        <Link
          href="/proyek"
          className="mt-6 inline-block rounded-lg bg-utama px-5 py-2 font-semibold text-white"
        >
          Lihat semua proyek
        </Link>
      </section>
    </main>
  );
}
