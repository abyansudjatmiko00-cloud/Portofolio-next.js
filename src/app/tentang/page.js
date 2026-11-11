
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Tentang",
  description:
    "Cerita, hobi, cita-cita, dan jadwal belajar Muhammad Abyan Sudjatmiko.",
};

const hobi = ["Bermain Game", "Berenang", "Traveling"];

const rencana = [
  "Kuliah",
  "Mendapatkan Pekerjaan mapan",
  "Slow living",
];

const jadwal = [
  { hari: "Senin", kegiatan: "Belajar di sekolah" },
  { hari: "Selasa", kegiatan: "Belajar pemrograman" },
  { hari: "Rabu", kegiatan: "Mengerjakan tugas" },
  { hari: "Kamis", kegiatan: "Belajar pemrograman" },
  { hari: "Jumat", kegiatan: "Evaluasi pembelajaran" },
  { hari: "Sabtu", kegiatan: "Beristirahat" },
  { hari: "Minggu", kegiatan: "Berolahraga" },
];

export default function Tentang() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold text-utama md:text-4xl">
        Tentang Saya
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Perkenalan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-muted-foreground">
            Saya adalah pelajar SMK Negeri 1 Pasuruan jurusan Rekayasa
            Perangkat Lunak (RPL) yang memiliki minat besar di bidang
            teknologi dan pengembangan website. Saya sedang mempelajari
            HTML, CSS, JavaScript, Next.js, serta desain UI/UX untuk
            meningkatkan kemampuan saya. Saya juga senang mencoba hal baru,
            mengerjakan proyek, dan mengembangkan portofolio sebagai langkah
            untuk menjadi Web Developer yang profesional.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hobi</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              {hobi.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cita-cita</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3">
              Menjadi <strong>Full Stack Web Developer</strong>. Langkah
              yang saya rencanakan:
            </p>
            <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
              {rencana.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Jadwal Belajar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="p-3">Hari</th>
                  <th className="p-3">Kegiatan</th>
                </tr>
              </thead>
              <tbody>
                {jadwal.map((item) => (
                  <tr key={item.hari}>
                    <td className="p-3 font-medium">{item.hari}</td>
                    <td className="p-3">{item.kegiatan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
