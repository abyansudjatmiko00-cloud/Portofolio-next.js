import FormPin from "@/components/FormPin";
import KonfirmasiHapus from "@/components/KonfirmasiHapus";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sudahMasuk } from "@/lib/pin";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  hapusPesan,
  hapusProyek,
  keluarKelola,
  sematkanPesan,
} from "./actions";
import Link from "next/link";

export const metadata = {
  title: "Kelola Data",
};

export default async function Kelola() {
  if (!(await sudahMasuk())) {
    return (
      <main className="mx-auto w-full max-w-md px-4 py-10">
        <h1 className="text-3xl font-bold text-primary">
          Kelola Data
        </h1>
        <p className="mt-3 text-muted-foreground">
          Halaman ini khusus pemilik portofolio.
        </p>
        <Card className="mt-6">
          <CardContent>
            <FormPin />
          </CardContent>
        </Card>
      </main>
    );
  }

  const { data: daftarPesan } = await supabaseAdmin
    .from("buku_tamu")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: daftarProyek } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">
          Kelola Data
        </h1>
        <form action={keluarKelola}>
          <Button type="submit" variant="outline">
            Keluar
          </Button>
        </form>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">
          Proyek
        </h2>
        <Link
          href="/kelola/proyek/baru"
          className={buttonVariants()}
        >
          Tambah Proyek
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {daftarProyek &&
          daftarProyek.map((item) => (
            <Card key={item.id} size="sm">
              <CardHeader>
                <CardTitle>{item.judul}</CardTitle>
                <CardDescription>
                  {item.kategori} &middot; {item.minggu}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Link
                  href={`/kelola/proyek/${item.id}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                  })}
                >
                  Ubah
                </Link>
                <KonfirmasiHapus
                  id={item.id}
                  aksi={hapusProyek}
                  judul="Hapus proyek ini?"
                  keterangan={`Proyek ${item.judul} akan hilang dari halaman Proyek dan Beranda.`}
                />
              </CardContent>
            </Card>
          ))}
      </div>

      <h2 className="mt-8 text-2xl font-bold text-primary">
        Pesan Buku Tamu
      </h2>
      <div className="mt-4 space-y-4">
        {daftarPesan &&
          daftarPesan.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.nama}</CardTitle>
                <CardDescription>{item.pesan}</CardDescription>
                {item.disematkan && <Badge>Disematkan</Badge>}
              </CardHeader>
              <CardContent className="flex gap-2">
                <form action={sematkanPesan}>
                  <input
                    type="hidden"
                    name="id"
                    value={item.id}
                  />
                  <input
                    type="hidden"
                    name="sematkan"
                    value={item.disematkan ? "tidak" : "ya"}
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                  >
                    {item.disematkan ? "Lepas Sematan" : "Sematkan"}
                  </Button>
                </form>
                <KonfirmasiHapus
                  id={item.id}
                  aksi={hapusPesan}
                  judul="Hapus pesan ini?"
                  keterangan="Pesan buku tamu ini akan dihapus permanen."
                />
              </CardContent>
            </Card>
          ))}
      </div>
    </main>
  );
}