'use client'
import Link from "next/link";
import { Icon } from "../icons";
import { sideBarMenu } from "@/data";
import { SideBarItem } from "./sidebar-item";
import { useAuth } from "../auth-context";

export function SideBar() {
  const { logout, user } = useAuth();

  return (
    <div className="p-6 h-[100vh] overflow-y-auto flex flex-col">
      <Link href="/" className="pl-3 mb-[64px] flex">
        <Icon name="Logo" className="[&>svg]:w-[155px] [&>svg]:h-[35px]" />
      </Link>
      <ul className="flex flex-col gap-1 flex-1">
        {sideBarMenu.map(({ label, href, icon }) => (
          <SideBarItem
            key={label}
            label={label}
            href={href}
            icon={icon}
          />
        ))}
      </ul>

      {/* User info and logout button */}
      <div className="mt-auto pt-6 border-t border-gray-700">
        {user && (
          <div className="mb-4 px-3">
            <p className="text-sm text-gray-300 font-medium">{user.name || 'Пользователь'}</p>
            <p className="text-xs text-gray-500">{user.email || user.phone_number}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-[14px] font-bold text-base leading-5 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-2xl transition-colors"
        >
          <Icon name="Arrow" className="rotate-180" />
          <span>Выйти</span>
        </button>
      </div>
    </div>
  );
}
