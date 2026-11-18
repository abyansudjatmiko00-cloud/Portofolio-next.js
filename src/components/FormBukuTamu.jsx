
"use client";

import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function FormBukuTamu({ aksi }) {
  const [state, formAction, pending] = useActionState(aksi, {});

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nama">Nama</Label>
        <Input
          id="nama"
          name="nama"
          placeholder="Nama kamu"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pesan">Pesan</Label>
        <Textarea
          id="pesan"
          name="pesan"
          placeholder="Tulis pesan kamu..."
          rows={4}
          required
        />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Mengirim..." : "Kirim Pesan"}
      </Button>

      {state.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
      {state.berhasil && (
        <p className="text-sm text-green-600">{state.berhasil}</p>
      )}
    </form>
  );
}
