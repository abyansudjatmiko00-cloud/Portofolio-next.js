
"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TombolKirim from "@/components/TombolKirim";

export default function FormProyek({ aksi, proyek, teksTombol }) {
  const [state, formAction] = useActionState(aksi, { proyek });

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={proyek.id} />

      <div className="space-y-2">
        <Label htmlFor="judul">Judul</Label>
        <Input
          id="judul"
          name="judul"
          placeholder="Contoh: Website Portofolio Pribadi"
          defaultValue={state.proyek.judul}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          placeholder="Contoh: portofolio-pribadi"
          defaultValue={state.proyek.slug}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="kategori">Kategori</Label>
        <Input
          id="kategori"
          name="kategori"
          placeholder="Contoh: Next.js"
          defaultValue={state.proyek.kategori}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="minggu">Minggu</Label>
        <Input
          id="minggu"
          name="minggu"
          placeholder="Contoh: Minggu 15"
          defaultValue={state.proyek.minggu}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deskripsi">Deskripsi</Label>
        <Textarea
          id="deskripsi"
          name="deskripsi"
          rows={2}
          placeholder="Contoh: Website untuk menampilkan profil dan hasil proyek saya."
          defaultValue={state.proyek.deskripsi}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fitur">Fitur</Label>
        <Textarea
          id="fitur"
          name="fitur"
          rows={3}
          placeholder={"Contoh:\nTampilan responsif\nHalaman proyek\nNavigasi antarhalaman"}
          defaultValue={state.proyek.fitur.join("\n")}
        />
        <p className="text-xs text-muted-foreground">
          Tulis satu fitur pada setiap baris.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gambar_url">URL Gambar</Label>
        <Input
          id="gambar_url"
          name="gambar_url"
          placeholder="Contoh: /proyek/proyek-portofolio.png"
          defaultValue={state.proyek.gambar_url}
        />
        <p className="text-xs text-muted-foreground">
          Simpan gambar di folder public/proyek.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <TombolKirim teks={teksTombol} />

        <Link
          href="/kelola"
          className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Batal
        </Link>
      </div>

      {state.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
    </form>
  );
}
