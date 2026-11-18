
"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function kirimPesan(stateSebelum, formData) {
  const nama = formData.get("nama")?.trim();
  const pesan = formData.get("pesan")?.trim();

  if (!nama || !pesan) {
    return { error: "Nama dan pesan wajib diisi." };
  }

  const { error } = await supabaseAdmin
    .from("buku_tamu")
    .insert({ nama, pesan });

  if (error) {
    return { error: "Pesan gagal dikirim. Silakan coba lagi." };
  }

  revalidatePath("/buku-tamu");

  return { berhasil: "Pesan berhasil dikirim!" };
}
