
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sudahMasuk } from "@/lib/pin";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function masukKelola(stateSebelum, formData) {
  const pin = formData.get("pin");

  if (pin !== process.env.ADMIN_PIN) {
    return { error: "PIN salah. Coba lagi." };
  }

  const kue = await cookies();
  kue.set("pin_admin", pin, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60,
  });

  return {};
}

export async function keluarKelola() {
  const kue = await cookies();
  kue.delete("pin_admin");
}

export async function sematkanPesan(formData) {
  if (!(await sudahMasuk())) {
    return;
  }

  const id = formData.get("id");
  const sematkan = formData.get("sematkan") === "ya";

  await supabaseAdmin
    .from("buku_tamu")
    .update({ disematkan: sematkan })
    .eq("id", id);

  revalidatePath("/kelola");
  revalidatePath("/buku-tamu");
}

export async function hapusPesan(formData) {
  if (!(await sudahMasuk())) {
    return;
  }

  const id = formData.get("id");

  await supabaseAdmin
    .from("buku_tamu")
    .delete()
    .eq("id", id);

  revalidatePath("/kelola");
  revalidatePath("/buku-tamu");
}

function bacaProyek(formData) {
  return {
    judul: formData.get("judul").trim(),
    slug: formData.get("slug").trim(),
    kategori: formData.get("kategori").trim(),
    minggu: formData.get("minggu").trim(),
    deskripsi: formData.get("deskripsi").trim(),
    fitur: formData
      .get("fitur")
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f !== ""),
    gambar_url: formData.get("gambar_url").trim(),
  };
}

function cekProyek(proyek) {
  if (
    proyek.judul === "" ||
    proyek.slug === "" ||
    proyek.kategori === "" ||
    proyek.deskripsi === ""
  ) {
    return "Judul, slug, kategori, dan deskripsi wajib diisi.";
  }

  if (proyek.slug.includes(" ")) {
    return "Slug tidak boleh memakai spasi. Gunakan tanda hubung, contoh: buku-tamu.";
  }

  if (!proyek.gambar_url.startsWith("/proyek/")) {
    return "Alamat gambar harus diawali /proyek/, contoh: /proyek/proyek-buku-tamu.png.";
  }

  return "";
}

function perbaruiHalaman(slug) {
  revalidatePath("/");
  revalidatePath("/proyek");
  revalidatePath(`/proyek/${slug}`);
  revalidatePath("/kelola");
}

export async function tambahProyek(stateSebelum, formData) {
  const proyek = bacaProyek(formData);

  if (!(await sudahMasuk())) {
    return {
      error: "Masukkan PIN dulu di halaman Kelola.",
      proyek,
    };
  }

  const error = cekProyek(proyek);

  if (error !== "") {
    return { error, proyek };
  }

  const hasil = await supabaseAdmin
    .from("projects")
    .insert(proyek);

  if (hasil.error) {
    if (hasil.error.code === "23505") {
      return {
        error: "Slug sudah dipakai proyek lain.",
        proyek,
      };
    }

    return {
      error: `Proyek gagal disimpan: ${hasil.error.message}`,
      proyek,
    };
  }

  perbaruiHalaman(proyek.slug);
  redirect("/kelola");
}

export async function ubahProyek(stateSebelum, formData) {
  const proyek = bacaProyek(formData);

  if (!(await sudahMasuk())) {
    return {
      error: "Masukkan PIN dulu di halaman Kelola.",
      proyek,
    };
  }

  const error = cekProyek(proyek);

  if (error !== "") {
    return { error, proyek };
  }

  const id = formData.get("id");

  const hasil = await supabaseAdmin
    .from("projects")
    .update(proyek)
    .eq("id", id);

  if (hasil.error) {
    if (hasil.error.code === "23505") {
      return {
        error: "Slug sudah dipakai proyek lain.",
        proyek,
      };
    }

    return {
      error: `Proyek gagal diubah: ${hasil.error.message}`,
      proyek,
    };
  }

  perbaruiHalaman(proyek.slug);
  redirect("/kelola");
}

export async function hapusProyek(formData) {
  if (!(await sudahMasuk())) {
    return;
  }

  const id = formData.get("id");

  await supabaseAdmin
    .from("projects")
    .delete()
    .eq("id", id);

  revalidatePath("/");
  revalidatePath("/proyek");
  revalidatePath("/kelola");
}
