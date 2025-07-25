import { Input } from "@/components/input/input";
import { Label } from "@/components/input/label";
import { Spinner } from "@/components/spinner/spinner";
import useProfile from "@/components/useProfile";
import { useEffect, useState } from "react";
import { PRICING_CONFIG, calculateTotalBudget } from "./pricing-config";
import { Icon } from "@/components/icons";

export const StepSeven = ({ form }) => {
  const { profile, isLoading, isError, mutate } = useProfile();
  const [showBudgetInfo, setShowBudgetInfo] = useState(false);
  const [calculatedBudget, setCalculatedBudget] = useState(0);

  // Calculate budget based on form values using pricing configuration
  useEffect(() => {
    const publicationType = form.watch("publication_type");
    const influencerAmount = form.watch("influencer_amount");

    if (publicationType && influencerAmount > 0) {
      // Get all ranks from pricing config
      const ranks = [
        { name: "bronze" },
        { name: "silver" },
        { name: "gold" },
        { name: "platinum" }
      ];

      // Calculate total budget using the same logic as Step Four
      const totalBudget = calculateTotalBudget(publicationType, influencerAmount, ranks);
      setCalculatedBudget(totalBudget);
    } else {
      setCalculatedBudget(0);
    }
  }, [form.watch("publication_type"), form.watch("influencer_amount")]);

  if (isLoading) return <Spinner />

  return (
    <div className="flex flex-col gap-4">

      <div className="flex flex-col gap-2 w-full">
        <Label label="Инфлюэнсеров" />
        <Input
          {...form.register("influencer_amount", {
            valueAsNumber: true,
            onChange: (e) => form.setValue("influencer_amount", Number(e.target.value))
          })}
          type="number"
          placeholder="Количество инфлюэнсеров"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label label="Ваш баланс" />
        <Input value={profile?.balance} disabled />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between w-full">
          <Label label="Рассчитанный бюджет кампании" />
          <span
            className="text-sm text-[#AAAAAA] cursor-pointer hover:underline"
            onClick={() => setShowBudgetInfo(true)}
          >
            Как определяется бюджет?
          </span>
        </div>
        <Input value={`${calculatedBudget.toLocaleString()}₸`} disabled />
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
        <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center backdrop-blur-sm bg-[rgba(0,0,0,0.2)] z-50">
          <div className="relative bg-black p-6 rounded-[32px] z-50 min-w-[656px] max-w-[656px] w-full flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold leading-7">Как определяется бюджет</div>
              <Icon name="Close" onClick={() => setShowBudgetInfo(false)} className="cursor-pointer" />
            </div>
            <div>
              <div className="text-base text-[#AAAAAA] mb-4">
                Бюджет автоматически рассчитывается на основе выбранного типа контента и количества инфлюэнсеров.<br /><br />
                <strong>Порядок стоимости:</strong> Reels {'>'} Post {'>'} Stories<br />
                <strong>Комиссия платформы:</strong> 35% от базовой стоимости
              </div>

              <div className="mb-4">
                <div className="mb-2 font-semibold">Таблица ценообразования</div>
                <div className="space-y-2">
                  <div className="bg-[#232323] rounded-xl p-3">
                    <div className="font-medium mb-2">Бронза</div>
                    <div className="text-sm space-y-1">
                      <div>Reels: 12,000₸ + комиссия 4,200₸ = 16,200₸</div>
                      <div>Post: 8,400₸ + комиссия 2,940₸ = 11,340₸</div>
                      <div>Stories: 6,000₸ + комиссия 2,100₸ = 8,100₸</div>
                    </div>
                  </div>

                  <div className="bg-[#232323] rounded-xl p-3">
                    <div className="font-medium mb-2">Серебро</div>
                    <div className="text-sm space-y-1">
                      <div>Reels: 20,000₸ + комиссия 7,000₸ = 27,000₸</div>
                      <div>Post: 14,000₸ + комиссия 4,900₸ = 18,900₸</div>
                      <div>Stories: 10,000₸ + комиссия 3,500₸ = 13,500₸</div>
                    </div>
                  </div>

                  <div className="bg-[#232323] rounded-xl p-3">
                    <div className="font-medium mb-2">Золото</div>
                    <div className="text-sm space-y-1">
                      <div>Reels: 36,000₸ + комиссия 12,600₸ = 48,600₸</div>
                      <div>Post: 25,200₸ + комиссия 8,820₸ = 34,020₸</div>
                      <div>Stories: 18,000₸ + комиссия 6,300₸ = 24,300₸</div>
                    </div>
                  </div>

                  <div className="bg-[#232323] rounded-xl p-3">
                    <div className="font-medium mb-2">Платина</div>
                    <div className="text-sm space-y-1">
                      <div>Reels: 60,000₸ + комиссия 21,000₸ = 81,000₸</div>
                      <div>Post: 42,000₸ + комиссия 14,700₸ = 56,700₸</div>
                      <div>Stories: 30,000₸ + комиссия 10,500₸ = 40,500₸</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-3">
                <div className="text-sm text-blue-300">
                  <strong>Примечание:</strong> Вы не платите блогеру напрямую. Вы предоставляете продукт
                  или услугу на сумму, указанную выше, а SWAPP берет фиксированную комиссию за подбор,
                  автоматизацию и сопровождение кампании.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
