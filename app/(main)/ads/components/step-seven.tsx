import { Input } from "@/components/input/input";
import { Label } from "@/components/input/label";
import useProfile from "@/components/useProfile";
export const StepSeven = ({ form }) => {

  const { profile, isLoading, isError, mutate } = useProfile();

  return (
    <div className="flex flex-col gap-4">

      <div className="flex flex-col gap-2 w-full">
        <Label label="Инфлюэнсеров" />
        <Input value={form.watch("influencers")} disabled />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label label="Ваш баланс" />
        <Input value={profile?.balance} disabled />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label label="Бюджет кампании" />
        <Input value={form.watch("influencers")} disabled />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label label="Введите сумму пополнения" />
        <Input value={form.watch("influencers")} disabled />
      </div>
    </div>
  );
};
