"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logoutAction() {
  const cookieStore = await cookies();

  // ✅ Overwrite cookie to expire it
  cookieStore.set("auth_user", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite:"lax",
  });

  redirect("/login");
}
