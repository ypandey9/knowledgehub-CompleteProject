import { cookies } from "next/headers";
import { Providers } from "@/store/Providers";
import Navbar from "@/components/Navbar";
import ModalProvider from "@/components/ModalProvider";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth_user");

  let initialUser = null;
  if (auth?.value) {
    try {
      initialUser = JSON.parse(auth.value);
    } catch {
      initialUser = null;
    }
  }

  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {/* ✅ PORTAL TARGET — MUST EXIST FIRST */}
        <div id="modal-root"></div>

        <Providers initialUser={initialUser}>
          <ModalProvider>
            <Navbar />
            <main className="p-6">{children}</main>
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
}

