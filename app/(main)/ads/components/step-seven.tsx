import { Input } from "@/components/input/input";
import { Label } from "@/components/input/label";
import { Spinner } from "@/components/spinner/spinner";
import useProfile from "@/components/useProfile";
import { useEffect, useState } from "react";
import { Modal } from "@/components/modal/modal";
export const StepSeven = ({ form }) => {

  const { profile, isLoading, isError, mutate } = useProfile();
  const [showBudgetInfo, setShowBudgetInfo] = useState(false);

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
        <div className="flex items-center justify-between w-full">
          <Label label="Бюджет кампании" />
          <span
            className="text-sm text-[#AAAAAA] cursor-pointer hover:underline"
            onClick={() => setShowBudgetInfo(true)}
          >
            Как определяется бюджет?
          </span>
        </div>
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

      {showBudgetInfo && (
        <Modal label="Как определяется бюджет" close={() => setShowBudgetInfo(false)}>
          <div className="text-base text-[#AAAAAA] mb-4">
            В зависимости от бюджета рекламной кампании наши алгоритмы определяют наиболее эффективное сотрудничество с инфлюэнсерами разных рейтингов.<br /><br />
            Например: при запуске кампании на указанную максимальную сумму мы стараемся подобрать инфлюэнсеров статуса "платина". В случае неподбора мы предлагаем ваши условия среди блогеров статуса "золото" и так далее пока не закроем запрашиваемое количество инфлюэнсеров. Остаток бюджета будет возвращен на баланс согласно тарифу.
          </div>
          <div className="mb-2 font-semibold">Тариф</div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="bg-[#232323] rounded-xl px-4 py-2">Бронзовый 4000 тг</div>
            <div className="bg-[#232323] rounded-xl px-4 py-2">Серебряный 6000 тг</div>
            <div className="bg-[#232323] rounded-xl px-4 py-2">Золотой 10000 тг</div>
            <div className="bg-[#232323] rounded-xl px-4 py-2">Платина 20000 тг</div>
          </div>
          <div className="text-right text-xs text-[#AAAAAA] cursor-pointer hover:underline">Как определяется рейтинг?</div>
        </Modal>
      )}
    </div>
  );
};
