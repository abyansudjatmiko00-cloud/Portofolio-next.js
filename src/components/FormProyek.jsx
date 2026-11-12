
export default function FormProyek({
  proyek = {},
  aksi,
  labelTombol = "Simpan Proyek",
}) {
  const gayaKolom =
    "w-full rounded-lg border-4 border-gray-700 bg-white p-4 text-base font-semibold text-black shadow-md outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-200";

  const gayaLabel =
    "mb-2 block text-base font-extrabold text-black";

  return (
    <form action={aksi} className="space-y-6">
      <div>
        <label className={gayaLabel}>Judul Proyek</label>
        <input
          name="judul"
          defaultValue={proyek.judul || ""}
          required
          className={gayaKolom}
        />
      </div>

      <div>
        <label className={gayaLabel}>Slug</label>
        <input
          name="slug"
          defaultValue={proyek.slug || ""}
          required
          className={gayaKolom}
        />
      </div>

      <div>
        <label className={gayaLabel}>Kategori</label>
        <select
          name="kategori"
          defaultValue={proyek.kategori || "Next.js"}
          className={gayaKolom}
        >
          <option>HTML</option>
          <option>CSS</option>
          <option>JavaScript</option>
          <option>Next.js</option>
        </select>
      </div>

      <div>
        <label className={gayaLabel}>Minggu</label>
        <input
          name="minggu"
          type="number"
          min="1"
          defaultValue={proyek.minggu || 15}
          required
          className={gayaKolom}
        />
      </div>

      <div>
        <label className={gayaLabel}>Deskripsi</label>
        <textarea
          name="deskripsi"
          defaultValue={proyek.deskripsi || ""}
          required
          rows={4}
          className={gayaKolom}
        />
      </div>

      <div>
        <label className={gayaLabel}>
          Fitur (satu fitur per baris)
        </label>
        <textarea
          name="fitur"
          defaultValue={
            Array.isArray(proyek.fitur)
              ? proyek.fitur.join("\n")
              : ""
          }
          rows={4}
          className={gayaKolom}
        />
      </div>

      <div>
        <label className={gayaLabel}>URL Gambar</label>
        <input
          name="gambar_url"
          defaultValue={proyek.gambar_url || ""}
          required
          placeholder="/proyek/nama-gambar.png"
          className={gayaKolom}
        />
      </div>

      <button
        type="submit"
        className="rounded-lg border-2 border-blue-800 bg-blue-700 px-6 py-3 text-base font-extrabold text-white shadow-md transition hover:bg-blue-800"
      >
        {labelTombol}
      </button>
    </form>
  );
}
