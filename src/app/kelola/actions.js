
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sudahMasuk } from "@/lib/pin";

// Mengambil data dari formulir
function ambilData(formData) {
  return {
    judul: String(formData.get("judul") || "").trim(),
    slug: String(formData.get("slug") || "").trim(),
    kategori: String(formData.get("kategori") || "").trim(),
    minggu: Number(formData.get("minggu")),
    deskripsi: String(formData.get("deskripsi") || "").trim(),
    fitur: String(formData.get("fitur") || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    gambar_url: String(formData.get("gambar_url") || "").trim(),
  };
}

// Memvalidasi data proyek
function validasi(data) {
  if (
    !data.judul ||
    !data.slug ||
    !data.kategori ||
    !data.deskripsi ||
    !data.gambar_url
  ) {
    return "Semua kolom wajib diisi.";
  }

  if (/\s/.test(data.slug)) {
    return "Slug tidak boleh mengandung spasi.";
  }

  if (!Number.isInteger(data.minggu) || data.minggu < 1) {
    return "Minggu harus berupa angka minimal 1.";
  }

  if (!data.gambar_url.startsWith("/proyek/")) {
    return "Lokasi gambar harus diawali /proyek/.";
  }

  const kategoriValid = [
    "HTML",
    "CSS",
    "JavaScript",
    "Next.js",
  ];

  if (!kategoriValid.includes(data.kategori)) {
    return "Kategori tidak valid.";
  }

  return null;
}

// Login admin menggunakan PIN
export async function masukAdmin(formData) {
  const pinInput = String(formData.get("pin") || "");

  if (
    !process.env.ADMIN_PIN ||
    pinInput !== process.env.ADMIN_PIN
  ) {
    redirect("/kelola?error=pin");
  }

  const kue = await cookies();

  kue.set("pin_admin", pinInput, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/kelola");
}

// Logout admin
export async function keluarAdmin() {
  const kue = await cookies();
  kue.delete("pin_admin");

  redirect("/kelola");
}

// Menambahkan proyek
export async function tambahProyek(formData) {
  if (!(await sudahMasuk())) redirect("/kelola");

  const data = ambilData(formData);
  const errorValidasi = validasi(data);

  if (errorValidasi) {
    redirect("/kelola?error=validasi");
  }

  const { error } = await supabaseAdmin
    .from("projects")
    .insert([data]);

  if (error) {
    console.error("Gagal menambah proyek:", error.message);
    redirect("/kelola?error=tambah");
  }

  revalidatePath("/");
  revalidatePath("/proyek");
  redirect("/kelola");
}

// Mengubah proyek
export async function ubahProyek(id, formData) {
  if (!(await sudahMasuk())) redirect("/kelola");

  const data = ambilData(formData);
  const errorValidasi = validasi(data);

  if (errorValidasi) {
    redirect("/kelola?error=validasi");
  }

  const { error } = await supabaseAdmin
    .from("projects")
    .update(data)
    .eq("id", id);

  if (error) {
    console.error("Gagal mengubah proyek:", error.message);
    redirect("/kelola?error=ubah");
  }

  revalidatePath("/");
  revalidatePath("/proyek");
  redirect("/kelola");
}

// Menghapus proyek
export async function hapusProyek(formData) {
  if (!(await sudahMasuk())) redirect("/kelola");

  const id = formData.get("id");

  if (!id) {
    redirect("/kelola?error=id");
  }

  const { error } = await supabaseAdmin
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Gagal menghapus proyek:", error.message);
    redirect("/kelola?error=hapus");
  }

  revalidatePath("/");
  revalidatePath("/proyek");
  redirect("/kelola");
}
