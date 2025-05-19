'use client'
import { Button, ButtonBG } from "@/components/button/button";
import { Icon } from "@/components/icons";
import { Input } from "@/components/input/input";
import { InputPhone } from "@/components/input/input-phone";
import { post } from "@/fetcher";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const {push} = useRouter()

  const login = async () => {
    const res = await post({ url: "business/v1/login", data: { phone_number: phone, code: password }, custom: true })
    if (res.statusCode === 200) {
      localStorage.setItem("token", res.result.token)
      push("/")
    }
  }

  if (step === 1) {
    return (<div>
      <div className="text-white text-[24px]  font-[800]">Вход в личный кабинет</div>
      <div className="flex mt-8 gap-2 mb-4">
        <InputPhone value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Button label={"Далее"} bg={ButtonBG.primary} onClick={() => setStep(2)} />
      </div>
      <Link href={"/login/forgot-password"} className="text-white text-[14px] font-[500] underline">
        Забыли данные от аккаунта?
      </Link>
    </div>
    );
  }
  if (step === 2) {
    return (
      <div>

<div className="flex flex-col gap-2">
        <div className="flex items-center cursor-pointer" onClick={() => setStep(1)}>
            <Icon name="DropArrow" className="rotate-90" />
            <span>Назад</span>
        </div>

        <div className="text-white text-[24px]  font-[800]">Вход в личный кабинет</div>
</div>
      <div className="flex mt-8 gap-2 mb-4">
        <Input value={password} placeholder="Введите пароль" type="password" onChange={(e) => setPassword(e.target.value)} />
        <Button label={"Далее"} bg={ButtonBG.primary} onClick={() => login()} />
      </div>

      <Link href={"/login/forgot-password"} className="text-white text-[14px] font-[500] underline">
        Забыли данные от аккаунта?
      </Link>
    </div>
  )
  }
  return null
}
