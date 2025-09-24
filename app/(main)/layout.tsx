'use client'
import { SideBar } from "@/components/sidebar/sidebar";
import TableProvider from "@/components/temp/table-provider";
import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { Spinner } from "@/components/spinner/spinner";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <TableProvider>
      <div className="flex h-full">
        <SideBar />
        <div
          id="page-wrapper"
          className="bg-black flex-1 p-6 min-h-full h-fit relative"
        >
          {children}
        </div>
      </div>
    </TableProvider>
  );
}
