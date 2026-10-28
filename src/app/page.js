import Hero from "@/components/Hero";
import SkillCard from "@/components/SkillCard";
import Kartu from "@/components/Kartu";

const skills = [
  { nama: "HTML", level: "Menengah" },
  { nama: "CSS", level: "Menengah" },
  { nama: "Git dan GitHub", level: "Menengah" },
  { nama: "Desain poster dengan Canva", level: "Menengah" },
  { nama: "JavaScript", level: "Dasar" },
];

const hobi = [
  "Bermain Game",
  "Berenang",
  "Traveling",
];

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

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10">
      <Hero
        nama="Muhammad Abyan Sudjatmiko"
        tagline="Siswa kelas XI SMK Negeri 1 Pasuruan, calon Junior Web Developer di Kelas Industri UBIG."
      />

      <Kartu judul="Tentang Saya">
        <p>
          Saya adalah pelajar SMK Negeri 1 Pasuruan jurusan Rekayasa
          Perangkat Lunak (RPL) yang memiliki minat besar di bidang
          teknologi dan pengembangan website. Saya sedang mempelajari
          HTML, CSS, JavaScript, Next.js, serta desain UI/UX untuk
          meningkatkan kemampuan saya. Saya juga senang mencoba hal baru,
          mengerjakan proyek, dan mengembangkan portofolio sebagai langkah
          untuk menjadi Web Developer yang profesional.
        </p>
      </Kartu>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Kartu judul="Hobi">
          <ul className="list-disc space-y-1 pl-5">
            {hobi.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Kartu>

        <Kartu judul="Cita-cita">
          <p className="mb-2">
            Menjadi <strong>Full Stack Web Developer</strong>. Langkah
            yang saya rencanakan:
          </p>

          <ol className="list-decimal space-y-1 pl-5">
            {rencana.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </Kartu>
      </div>

      <Kartu judul="Keahlian">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard
              key={skill.nama}
              nama={skill.nama}
              level={skill.level}
            />
          ))}
        </div>
      </Kartu>

      <Kartu judul="Jadwal Belajar">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-utama text-white">
              <tr>
                <th className="p-3">Hari</th>
                <th className="p-3">Kegiatan</th>
              </tr>
            </thead>

            <tbody>
              {jadwal.map((item) => (
                <tr
                  key={item.hari}
                  className="border-b border-gray-200"
                >
                  <td className="p-3 font-medium">{item.hari}</td>
                  <td className="p-3">{item.kegiatan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Kartu>
    </main>
  );
}
