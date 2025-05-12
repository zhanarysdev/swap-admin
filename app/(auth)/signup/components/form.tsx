import { Icon } from "@/components/icons";
import { Input } from "@/components/input/input";
import { useForm } from "react-hook-form";

export function Form({ setPageState }: { setPageState: (pageState: "registration" | "verification" | "password" | "form") => void }) {
    const { register, handleSubmit } = useForm();
    const submit = async (data: any) => {
        console.log(data)
    }
    return <div>

        <div className="flex items-center cursor-pointer" onClick={() => setPageState("registration")}>
            <Icon name="DropArrow" className="rotate-90" />
            <span>Назад</span>
        </div>
        <div className="text-white text-[24px]  font-[800]">Регистрация</div>
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4 mt-8">
            <Input placeholder="Название компании" />
            <Input placeholder="БИН"  />
            <Input placeholder="+7 Номер телефона директора"  />
            <Input placeholder="+7 Номер телефона отображаемый в приложении"  />
        </form>
    </div>
}
