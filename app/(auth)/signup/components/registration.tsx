import { ButtonBG } from "@/components/button/button";

import { Button } from "@/components/button/button";
import { Checkbox } from "@/components/checkbox/checkbox";
import { FieldError } from "@/components/input/field-error";
import { InputPhone } from "@/components/input/input-phone";

export function Registration({ phone, setPhone, checked, setChecked, error, policyError, submit }: { phone: string, setPhone: (phone: string) => void, checked: boolean, setChecked: (checked: boolean) => void, error: string, policyError: boolean, submit: () => void }) {
    return (
        <div>
            <div className="text-white text-[24px]  font-[800]">Регистрация</div>
            <div className="flex mt-8 gap-2 mb-4">
                <InputPhone value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Button label={"Далее"} bg={ButtonBG.primary} onClick={submit} />
            </div>
            <FieldError error={error} />
            <div className="flex gap-2 items-center">
                <Checkbox checked={checked} onChange={() => setChecked(!checked)} styles="w-auto mb-[19px] pl-[20px]" />
                <span className={`flex ${policyError ? "text-red" : ""}`}>
                    Соглашаюсь с публичной офертой и политикой конфиденциальности
                </span>
            </div>
        </div>

    )
}
