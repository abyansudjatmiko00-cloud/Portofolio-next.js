import Image from "next/image";

export default function Hero({ nama, tagline }) {
  return (
    <section className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
      <Image
        src="/fotoprofil.jpeg"
        alt={`Foto profil ${nama}`}
        width={180}
        height={180}
        loading="eager"
        className="h-[180px] w-[180px] shrink-0 rounded-full border-4 border-aksen object-cover object-center"
      />

      <div>
        <h1 className="text-3xl font-bold text-utama md:text-5xl">
          Halo, saya {nama}!
        </h1>

        <p className="mt-3 text-lg text-gray-700">
          {tagline}
        </p>
      </div>
    </section>
  );
}
