import { cookies } from "next/headers";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth_user");

  if (!auth) {
    throw new Error("Unauthorized");
  }

  const user = JSON.parse(auth.value);

  if (user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  return user;
}
