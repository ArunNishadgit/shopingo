"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session?.user?.name} 🎉</h1>
      <p>{session?.user?.email}</p>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
