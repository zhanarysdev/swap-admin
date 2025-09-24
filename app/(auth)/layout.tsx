'use client'
import { Icon } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { useAuth } from "@/components/auth-context";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/ads');
    }
  }, [isAuthenticated, isLoading, router]);
  return (
    <div className="flex h-full  bg-[#212121]">
      <div className="relative flex-1">
        <Image fill objectFit="cover" sizes="100% 100%" src={"/login.png"} alt={"login"} />
      </div>
      <div className="flex-1 flex flex-col justify-between py-10 px-[60px]">
        <div className="flex justify-between items-center">
          <div>
            <Icon name="Logo" />
          </div>
          <div className="flex items-center gap-2">
            <Link href={pathname === "/signup" ? "/login" : "/signup"} className="prose-sm text-white text-[18px] leading-[22px] font-[600]">
              {pathname === "/signup" ? "Вход в личный кабинет" : "Создать аккаунт"}
            </Link>
            <Icon name="Arrow" className="mt-[3px]" />
          </div>
        </div>
        <div className="flex justify-center">{children}</div>
        <div className="flex flex-col gap-2">
          <p className="prose-sm text-grey">© 2025 Swapp</p>
          <a href="#" className="prose-sm text-white">
            Политика конфиденциальности{" "}
          </a>
        </div>
      </div>
    </div>
  );
}
