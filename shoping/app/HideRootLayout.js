"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function HideRootLayout({ children }) {
  const pathname = usePathname();

  // ROUTES jahan Header/Footer nahi chahiye
  const hideLayout =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/blog");

  return (
    <>
      {!hideLayout && <Header />}

      <main className="flex-grow">
        {children}
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}
