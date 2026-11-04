export const metadata = {
  title: "Kontak",
  description: "Hubungi Muhammad Abyan Sudjatmiko melalui form kontak, email, atau GitHub.",
};

const isian = "mt-1 w-full rounded-lg border border-gray-300 bg-white p-2";

export default function Kontak() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-utama md:text-4xl">Hubungi Saya</h1>
      <p className="mt-3 text-lg text-gray-700">
        Isi form di bawah ini. Catatan: form ini belum mengirim pesan, karena
        pengiriman pesan baru dibuat di Minggu 15.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:col-span-2">
          <form className="space-y-4">
            <div>
              <label htmlFor="nama" className="block font-semibold">
                Nama lengkap
              </label>
              <input type="text" id="nama" name="nama" placeholder="Contoh: Budi Santoso" required className={isian} />
            </div>

            <div>
              <label htmlFor="email" className="block font-semibold">
                Email
              </label>
              <input type="email" id="email" name="email" placeholder="nama@contoh.com" required className={isian} />
            </div>

            <div>
              <label htmlFor="keperluan" className="block font-semibold">
                Keperluan
              </label>
              <select id="keperluan" name="keperluan" required defaultValue="" className={isian}>
                <option value="" disabled>
                  Pilih keperluan
                </option>
                <option value="kerja-sama">Ajakan kerja sama</option>
                <option value="pertanyaan">Pertanyaan</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label htmlFor="pesan" className="block font-semibold">
                Pesan
              </label>
              <textarea id="pesan" name="pesan" rows={5} maxLength={300} placeholder="Tulis pesanmu (maksimal 300 karakter)" required className={isian} />
            </div>

            <button type="submit" className="rounded-lg bg-utama px-5 py-2 font-semibold text-white">
              Kirim
            </button>
          </form>
        </div>

        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-bold text-utama">Temukan Saya di</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/abyansudjatmiko00-cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-aksen hover:underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a href="mailto:emailkamu@contoh.com" className="font-semibold text-aksen hover:underline">
                abyansudjatmiko00@gmail.com
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
