
"use client";

export default function KonfirmasiHapus({ id, aksi }) {
  return (
    <form
      action={aksi}
      onSubmit={(event) => {
        const yakin = window.confirm(
          "Apakah kamu yakin ingin menghapus proyek ini?"
        );

        if (!yakin) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Hapus
      </button>
    </form>
  );
}
