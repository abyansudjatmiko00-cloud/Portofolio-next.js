
import FormKontak from "@/components/FormKontak";

export const metadata = {
  title: "Kontak",
  description:
    "Hubungi Muhammad Abyan Sudjatmiko melalui form kontak, email, atau GitHub.",
};

export default function Kontak() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-utama md:text-4xl">
        Hubungi Saya
      </h1>

      <p className="mt-3 text-lg text-gray-700">
        Isi form di bawah ini untuk menghubungi saya.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:col-span-2">
          <FormKontak />
        </div>

        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-bold text-utama">
            Temukan Saya di
          </h2>

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
              <a
                href="mailto:abyansudjatmiko00@gmail.com"
                className="font-semibold text-aksen hover:underline"
              >
                Email
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
