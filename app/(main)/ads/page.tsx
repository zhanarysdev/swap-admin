"use client";
import { Button, ButtonBG } from "@/components/button/button";
import { Header } from "@/components/header/header";
import { Modal } from "@/components/modal/modal";
import Table from "@/components/temp/table";
import { TableContext } from "@/components/temp/table-provider";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { StepOne } from "./components/step-one";
import { AdFormData, useAdForm } from "./components/useAdsForm";
import { StepTwo } from "./components/step-two";
import { StepThree } from "./components/step-three";
import { StepFour } from "./components/step-four";
import { StepFive } from "./components/step-five";
import { StepSix } from "./components/step-six";
import useSWR from "swr";
import { fetcher } from "@/fetcher";


const stepLabel = {
  1: "Информация",
  2: "Срок акции и время посещения",
  3: "Задания для инфлюэнсеров",
  4: "Вознаграждение",
  5: "Условия"
}

const isStepValid = (step: number, form: any) => {
  const values = form.getValues();
  const errors = form.formState.errors;

  switch (step) {
    case 1:
      // Only validate fields that are shown in step one
      const stepOneValid =
        values.influencer_amount > 0 &&
        values.category_ids?.length > 0 &&
        values.genders?.length > 0 &&
        values.branch_ids?.length > 0 &&
        values.images?.length > 0;

      console.log('Step 1 Validation:', {
        influencer_amount: values.influencer_amount > 0,
        category_ids: values.category_ids?.length > 0,
        genders: values.genders?.length > 0,
        branch_ids: values.branch_ids?.length > 0,
        images: values.images?.length > 0,
        values: {
          influencer_amount: values.influencer_amount,
          category_ids: values.category_ids,
          genders: values.genders,
          branch_ids: values.branch_ids,
          images: values.images
        }
      });

      return stepOneValid;
    case 2:
      return !errors.start_date &&
        !errors.end_date &&
        !errors.work_hours_by_week_day;
    case 3:
      return !errors.publication_type &&
        !errors.ad_format &&
        !errors.content_type_id &&
        !errors.clothing_type_id;
    case 4:
      return !errors.reward_by_rank &&
        values.reward_by_rank.length > 0;
    case 5:
      return !errors.is_bad_words_allowed &&
        !errors.is_custom_text &&
        (!values.is_custom_text || !errors.prepared_text);
    default:
      return true;
  }
};

export default function AdsPage() {
  const form = useAdForm();
  const { setContext } = useContext(TableContext);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  const { data, isLoading } = useSWR(
    { url: `business/v1/task/list?page=1`, custom: true },
    fetcher
  );
  console.log(data);

  useEffect(() => {
    setContext((prev) => ({
      ...prev,
      control: {
        label: "Создать объявление",
        action: () => setIsOpen(true),
      },
    }));
  }, []);

  const onSubmit = (data: AdFormData) => {
    console.log(data);
  };

  return (
    <div>
      <Header title={"Объявления"} subTitle={"Информация"} />
      <Table />
      {isOpen &&
        createPortal(
          <Modal label={stepLabel[step]} close={() => setIsOpen(false)}>
            <div>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {step === 1 && <StepOne form={form} />}
                {step === 2 && <StepTwo form={form} />}
                {step === 3 && <StepThree form={form} />}
                {step === 4 && <StepFour form={form} />}
                {step === 5 && <StepFive form={form} />}
                {step === 6 && <StepSix form={form} />}
              </form>
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex gap-2">
                  {step > 1 && (
                    <Button
                      styles="w-full justify-center font-bold"
                      bg={ButtonBG.grey}
                      label={"Назад"}
                      onClick={() => {
                        setStep(step - 1);
                      }}
                    />
                  )}
                  <Button
                    styles="w-full justify-center font-bold"
                    label={"Далее"}
                    onClick={() => {
                      setStep(step + 1);
                    }}
                    disabled={!isStepValid(step, form)}
                  />
                </div>
                <div className="flex justify-center items-center">{step}/7</div>
              </div>
            </div>
          </Modal>,
          document.getElementById("page-wrapper")
        )}
    </div>
  );
}
