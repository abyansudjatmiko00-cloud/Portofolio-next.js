
import FormKontak from "@/components/FormKontak";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

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
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <FormKontak />
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Temukan Saya di</CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="space-y-3">
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
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
