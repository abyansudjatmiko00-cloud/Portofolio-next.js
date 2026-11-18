
"use client";

import { useActionState } from "react";
import { masukKelola } from "@/app/kelola/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FormPin() {
  const [state, formAction, pending] = useActionState(
    masukKelola,
    {}
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pin">PIN Admin</Label>
        <Input
          id="pin"
          name="pin"
          type="password"
          placeholder="Masukkan PIN"
          required
        />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Memeriksa..." : "Masuk"}
      </Button>

      {state.error && (
        <p className="text-sm text-destructive">
          {state.error}
        </p>
      )}
    </form>
  );
}
