import { Input } from "@/components/input/input";
import { Label } from "@/components/input/label";
import { Spinner } from "@/components/spinner/spinner";
import useProfile from "@/components/useProfile";
import { useEffect } from "react";
export const StepSeven = ({ form }) => {

  const { profile, isLoading, isError, mutate } = useProfile();


  if (isLoading) return <Spinner />

  return (
    <div className="flex flex-col gap-4">

      <div className="flex flex-col gap-2 w-full">
        <Label label="Инфлюэнсеров" />
        <Input value={form.watch("influencer_amount")} disabled />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label label="Ваш баланс" />
        <Input value={profile?.balance} disabled />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label label="Бюджет кампании" />
        <Input value={"От 10000тг до 1000000тг"} disabled />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label label="Введите сумму пополнения" />
        <Input
          {...form.register("amount", {
            valueAsNumber: true,
            onChange: (e) => form.setValue("amount", Number(e.target.value))
          })}
          type="number"
          placeholder="Введите сумму"
        />
      </div>
    </div>
  );
};
