
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProyekCard({ proyek }) {
  return (
    <Link
      href={`/proyek/${proyek.slug}`}
      className="block h-full"
    >
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
        {proyek.gambar_url ? (
          <Image
            src={proyek.gambar_url}
            alt={`Tangkapan layar ${proyek.judul}`}
            width={640}
            height={420}
            unoptimized
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="flex h-48 items-center justify-center bg-muted text-muted-foreground">
            Tidak ada gambar
          </div>
        )}

        <CardContent className="p-5">
          <Badge variant="secondary">
            {proyek.kategori}
          </Badge>

          <h3 className="mt-3 text-lg font-semibold text-utama">
            {proyek.judul}
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            {proyek.deskripsi}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
