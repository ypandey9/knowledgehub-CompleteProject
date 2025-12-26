"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Home() {

  const user=useSelector((state:RootState)=>state.user.me);
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to KnowldgeHub! 🎉
      </h1>
      {user ? (
         <h2 className="text-4xl font-bold text-green-600">
        Welcome,{user.name}! 🎉
      </h2>
      ) : (
         <p className="mt-4 text-lg text-gray-700">
            Learn anything. Anytime. Anywhere.
          </p>
      )}
    </section>
  );
}
