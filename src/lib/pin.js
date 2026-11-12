
import { cookies } from "next/headers";

export async function sudahMasuk() {
  const kue = await cookies();
  const pin = kue.get("pin_admin");

  return (
    pin !== undefined &&
    pin.value === process.env.ADMIN_PIN
  );
}
