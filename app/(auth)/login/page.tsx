'use client'
import { Button, ButtonBG } from "@/components/button/button";
import { InputPhone } from "@/components/input/input-phone";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [phone, setPhone] = useState("");
  return (<div>
    <div className="text-white text-[24px]  font-[800]">Вход в личный кабинет</div>
    <div className="flex mt-8 gap-2 mb-4">
      <InputPhone value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Button label={"Далее"} bg={ButtonBG.primary} />
    </div>
    <Link href={"/login/forgot-password"} className="text-white text-[14px] font-[500] underline">
      Забыли данные от аккаунта?
    </Link>
  </div>
  );
}
