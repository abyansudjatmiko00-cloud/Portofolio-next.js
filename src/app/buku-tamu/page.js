
import FormBukuTamu from "@/components/FormBukuTamu";
import { kirimPesan } from "./actions";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Buku Tamu",
};

export default async function BukuTamu() {
  const { data: daftarPesan } = await supabaseAdmin
    .from("buku_tamu")
    .select("*")
    .order("disematkan", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold text-primary">
        Buku Tamu
      </h1>
      <p className="mt-2 text-muted-foreground">
        Tinggalkan pesan untuk portofolio saya.
      </p>

      <Card className="mt-6">
        <CardContent>
          <FormBukuTamu aksi={kirimPesan} />
        </CardContent>
      </Card>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Pesan Pengunjung
      </h2>

      <div className="mt-4 space-y-4">
        {daftarPesan?.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{item.nama}</CardTitle>
                {item.disematkan && <Badge>Disematkan</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <p>{item.pesan}</p>
            </CardContent>
          </Card>
        ))}

        {(!daftarPesan || daftarPesan.length === 0) && (
          <p className="text-muted-foreground">
            Belum ada pesan.
          </p>
        )}
      </div>
    </main>
  );
}
