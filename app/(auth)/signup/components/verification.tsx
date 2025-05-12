import { ButtonBG } from "@/components/button/button";
import { Button } from "@/components/button/button";
import { Icon } from "@/components/icons";
import { Input } from "@/components/input/input";

export function Verification({ code, setCode, submit, setPageState }: { code: string, setCode: (password: string) => void, submit: () => void, setPageState: (pageState: "registration" | "verification" | "password") => void }) {
    return <div>
        <div className="flex items-center cursor-pointer" onClick={() => setPageState("registration")}>
            <Icon name="DropArrow" className="rotate-90" />
            <span>Назад</span>
        </div>
        <div className="text-white text-[24px]  font-[800]">Регистрация</div>

        <div className="flex mt-8 gap-2 mb-4">
            <Input placeholder="Введите пароль" value={code} onChange={(e) => setCode(e.target.value)} />
            <Button label={"Далее"} bg={ButtonBG.primary} onClick={submit} />
        </div>
        <div className="w-[316px]">
            Введите код отправленный на whatsapp: +7 (777) 777-77-77 Изменить
        </div>
    </div>
}

