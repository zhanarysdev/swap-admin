"use client";
import { Button, ButtonBG } from "@/components/button/button";
import { Header } from "@/components/header/header";
import { Modal } from "@/components/modal/modal";
import Table from "@/components/temp/table";
import { TableContext } from "@/components/temp/table-provider";
import { useContext, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { StepOne } from "./components/step-one";
import { AdFormData, useAdForm } from "./components/useAdsForm";
import { StepTwo } from "./components/step-two";
import { StepThree } from "./components/step-three";
import { StepFour } from "./components/step-four";
import { StepFive } from "./components/step-five";
import { StepSix } from "./components/step-six";
import { StepSeven } from "./components/step-seven";
import { StepEight } from "./components/step-eight";
import useSWR from "swr";
import { fetcher, post } from "@/fetcher";

interface WorkHours {
  open: string;
  close: string;
}

interface WorkHoursByWeekDay {
  [key: string]: WorkHours;
}

const stepLabel = {
  1: "Информация",
  2: "Срок акции и время посещения",
  3: "Задания для инфлюэнсеров",
  4: "Вознаграждение",
  5: "Условия",
  6: "Предпросмотр",
  7: "Формирование счета",
  8: "Оплата",
};

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
      values.about.length > 0


      console.log("Step 1 Validation:", {
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
          images: values.images,
          about: values.about,
        },
      });

      return stepOneValid;
    case 2:
      // Debug step two validation
      console.log("Step 2 Validation:", {
        start_date: values.start_date,
        end_date: values.end_date,
        work_hours_by_week_day: values.work_hours_by_week_day,
        session_duration_sec: values.session_duration_sec,
        visit_at_same_time_count: values.visit_at_same_time_count,
        errors: errors,
      });

      // Check if all required fields are filled
      const hasValidDates = values.start_date && values.end_date;
      const hasValidSessionDuration = values.session_duration_sec > 0;
      const hasValidVisitCount = values.visit_at_same_time_count > 0;




      return (
        hasValidDates &&
        hasValidSessionDuration &&
        hasValidVisitCount
      );
    case 3:
      // Debug step three validation
      console.log("Step 3 Validation:", {
        publication_type: values.publication_type,
        ad_format: values.ad_format,
        tag_type: values.tag_type,
        errors: errors,
      });

      // Check if all required fields are filled
      const hasValidPublicationType =
        values.publication_type &&
        ["reels", "post", "story"].includes(values.publication_type);
      const hasValidAdFormat =
        values.ad_format &&
        ["image", "video", "reels"].includes(values.ad_format);
      const hasValidTagType =
        values.tag_type &&
        ["together_with_influencer", "separate"].includes(values.tag_type);

      return hasValidPublicationType && hasValidAdFormat && hasValidTagType;
    case 4:
      // Debug step four validation
      console.log("Step 4 Validation:", {
        reward_by_rank: values.reward_by_rank,
        errors: errors,
      });

      // Check if reward_by_rank is valid - can be either string or array of reward objects
      console.log(values.reward_by_rank);
      const hasValidRewards =
        values.reward_by_rank &&
        Array.isArray(values.reward_by_rank) &&
        values.reward_by_rank.length > 0 &&
        values.reward_by_rank.every(
          (reward) => reward.rank_id && reward.reward
        );

      return hasValidRewards;
    case 5:
      return (
        !errors.is_bad_words_allowed &&
        !errors.is_custom_text &&
        (!values.is_custom_text || !errors.prepared_text) &&
        values.content_ids?.length > 0
      );
    case 7:
      // Debug step seven validation
      console.log("Step 7 Validation:", {
        amount: values.amount,
        errors: errors,
      });

      // Check if amount is valid
      const hasValidAmount = values.amount && values.amount > 0;

      return hasValidAmount;
    case 8:
      // Debug step eight validation
      console.log("Step 8 Validation:", {
        card_number: values.card_number,
        card_holder: values.card_holder,
        cvc: values.cvc,
        expiry_month: values.expiry_month,
        expiry_year: values.expiry_year,
        errors: errors,
      });

      // Check if all payment fields are filled
      const hasValidCardNumber = values.card_number && values.card_number.length > 0;
      const hasValidCardHolder = values.card_holder && values.card_holder.length > 0;
      const hasValidCvc = values.cvc && values.cvc.length > 0;
      const hasValidExpiryMonth = values.expiry_month && values.expiry_month.length > 0;
      const hasValidExpiryYear = values.expiry_year && values.expiry_year.length > 0;

      return (
        hasValidCardNumber &&
        hasValidCardHolder &&
        hasValidCvc &&
        hasValidExpiryMonth &&
        hasValidExpiryYear
      );
    default:
      return true;
  }
};

const labels = [
  {
    key: "id",
    title: "ID",
  },
  {
    key: "totalInfluencers",
    title: "Участников",
  },
  {
    key: "budget",
    title: "Бюджет",
  },
  {
    key: "deadline",
    title: "Срок",
  },
  {
    key: "type",
    title: "Тип",
    rounded: true,
  },
  {
    key: "format",
    title: "Формат",
    rounded: true,
  },
  {
    key: "status",
    title: "Статус",
    status: true,
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\./g, ".");
};

export default function AdsPage() {
  const form = useAdForm();
  const { setContext } = useContext(TableContext);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const { data, isLoading } = useSWR(
    { url: `business/v1/task/list?page=1`, custom: true },
    fetcher
  );

  useEffect(() => {
    if (!data?.items) return;
    setContext((prev) => ({
      ...prev,
      data: data.items.map((el) => ({
        ...el,
        budget: `${el.spentBudget}/${el.totalBudget}`,
        deadline: `${formatDate(el.startDate)} - ${formatDate(el.endDate)}`,
        status: el.isArchived ? "В архиве" : el.status
      })),
      goTo: "/ads",
      number: true,
      labels: labels,
      control: {
        label: "Создать объявление",
        action: () => setIsOpen(true),
      },
    }));
  }, [data]);

  console.log(form.getValues())

  const onSubmit = async (data: AdFormData) => {
    try {
      const response = await post({
        url: "business/v1/task/create",
        custom: true,
        data: {
          about: data.about,
          ad_format: data.ad_format,
          branch_ids: data.branch_ids,
          businessID: data.businessID,
          category_ids: data.category_ids,
          clothing_type_id: data.clothing_type_id,
          content_ids: data.content_ids,
          end_date: data.end_date,
          genders: data.genders,
          images: data.images,
          influencer_amount: Number(data.influencer_amount),
          is_bad_words_allowed: data.is_bad_words_allowed,
          is_custom_text: data.is_custom_text,
          prepared_text: data.is_custom_text ? data.prepared_text : "",
          publication_type: data.publication_type,
          reward_by_rank: data.reward_by_rank,
          session_duration_sec: Number(data.session_duration_sec),
          start_date: data.start_date,
          tag_type: data.tag_type,
          visit_at_same_time_count: Number(data.visit_at_same_time_count),
          work_hours_by_week_day: data.work_hours_by_week_day,
          tag_business_required: true,
          budget: 0,
        },
      });
      console.log("response", response);
      if (response.task_id) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      return false; // Return false on error
    }
  };
  const pay = async (formData: AdFormData) => {
    const res = await post({
      url: "payment/top-up",
      data: {
        "amount": Number(formData.amount),
        "card_holder": formData.card_holder,
        "card_number": formData.card_number,
        "cvc": formData.cvc,
        "expiry_month": formData.expiry_month,
        "expiry_year": formData.expiry_year
      }
    })
    console.log("res", res)
    if (res.statusCode === 200) {
      return true;
    } else {
      return false;
    }
  }

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
                {step === 7 && <StepSeven form={form} />}
                {step === 8 && <StepEight form={form} />}
                <button
                  type="submit"
                  ref={submitButtonRef}
                  style={{ display: "none" }}
                />
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
                    label={step === 8 ? "Оплатить и создать" : "Далее"}
                    onClick={async () => {
                      if (isSubmitting) return; // Prevent multiple submissions

                      if (step === 8) {
                        try {
                          setIsSubmitting(true);
                          const formData = form.getValues();
                          const paymentResult = await pay(formData);
                          console.log("paymentResult", paymentResult)
                          if (paymentResult) {
                            const submitResult = await onSubmit(formData);
                            console.log("submitResult", submitResult)
                            if (submitResult) {
                              setIsOpen(false);
                              router.push("/ads");
                            }
                          }
                        } catch (error) {
                          console.error("Payment failed:", error);
                        } finally {
                          setIsSubmitting(false);
                        }
                      } else {
                        setStep(step + 1);
                      }
                    }}
                    disabled={!isStepValid(step, form) || isSubmitting}
                  />
                </div>
                <div className="flex justify-center items-center">{step}/8</div>
              </div>
            </div>
          </Modal>,
          document.getElementById("page-wrapper")
        )}
    </div>
  );
}
