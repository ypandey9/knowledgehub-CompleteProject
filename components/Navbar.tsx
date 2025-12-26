"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/userSlice";
import { logoutAction } from "@/app/actions/logout";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user.me);
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleLogout() {
    await logoutAction(); // clears cookie (server)
    dispatch(logout());   // clears redux (client)
    router.push("/login");
  }

  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        KnowledgeHub
      </Link>

      <div className="flex gap-4 items-center">
        <Link href="/courses" className="text-blue-600 font-medium">
          Courses
        </Link>

        {user ? (
          <>
            <Link href="/dashboard" className="text-blue-600 font-medium">
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

