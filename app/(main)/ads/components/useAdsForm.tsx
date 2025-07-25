import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    about: yup.string().required("Описание обязательно"),
    ad_format: yup
      .string()
      .oneOf(["image", "video", "reels"], "Неверный формат")
      .required("Формат обязателен"),
    branch_ids: yup
      .array()
      .of(yup.string())
      .required("Выберите хотя бы один филиал"),
    businessID: yup.string(),
    category_ids: yup
      .array()
      .of(yup.string())
      .required("Выберите хотя бы одну категорию"),
    clothing_type_id: yup.string().required("Тип одежды обязателен"),
    content_ids: yup
      .array()
      .of(yup.string())
      .min(1, "Выберите хотя бы один тип контента")
      .required("Тип контента обязателен"),
    end_date: yup.string().required("Дата окончания обязательна"),
    genders: yup.array().of(yup.string()).required("Выберите хотя бы один пол"),
    images: yup
      .array()
      .of(yup.string())
      .required("Загрузите хотя бы одно изображение"),
    influencer_amount: yup
      .number()
      .min(0, "Количество должно быть положительным")
      .required("Количество участников обязательно"),
    is_bad_words_allowed: yup
      .boolean()
      .required("Укажите разрешение на нецензурные слова"),
    is_custom_text: yup
      .boolean()
      .required("Укажите возможность кастомного текста"),
    prepared_text: yup.string().when("is_custom_text", {
      is: true,
      then: (schema) =>
        schema.required("Подготовленный текст обязателен при кастомном тексте"),
      otherwise: (schema) => schema.nullable(),
    }),
    publication_type: yup
      .string()
      .oneOf(["reels", "post", "story"], "Неверный тип публикации")
      .required("Тип публикации обязателен"),
    reward_by_rank: yup
      .array()
      .of(
        yup.object({
          rank_id: yup.string().required("ID ранга обязателен"),
          reward: yup.string().required("Вознаграждение обязательно"),
        })
      )
      .optional(),
    session_duration_sec: yup
      .number()
      .min(0, "Длительность должна быть положительной")
      .required("Длительность сессии обязательна"),
    start_date: yup.string().required("Дата начала обязательна"),
    tag_type: yup
      .string()
      .oneOf(["together_with_influencer", "separate"], "Неверный тип тега")
      .required("Тип тега обязателен"),
    visit_at_same_time_count: yup
      .number()
      .min(0, "Количество должно быть положительным")
      .required("Количество одновременных посещений обязательно"),
    work_hours_by_week_day: yup
      .object()
      .test(
        'at-least-one-valid',
        'Хотя бы один день должен быть заполнен и время открытия и закрытия не могут быть одинаковыми',
        function (value) {
          if (!value) return false;
          // Get all days as array
          const days = Object.values(value);
          // At least one day must have open and close set and open !== close
          return days.some(day => {
            const d = day as { open?: string; close?: string };
            return d.open && d.close && d.open !== d.close;
          });
        }
      )
      .required('Рабочие часы обязательны'),
    amount: yup
      .number()
      .min(1, "Сумма должна быть больше 0")
      .required("Сумма пополнения обязательна"),
    card_number: yup.string().required("Номер карты обязателен"),
    card_holder: yup.string().required("Владелец карты обязателен"),
    cvc: yup.string().required("CVC обязателен"),
    expiry_month: yup.string().required("Месяц обязателен"),
    expiry_year: yup.string().required("Год обязателен"),
  })
  .required();

export type AdFormData = yup.InferType<typeof schema>;

export const useAdForm = () => {
  const form = useForm<AdFormData>({
    resolver: yupResolver(schema) as unknown as Resolver<AdFormData>,
    defaultValues: {
      about: "",
      ad_format: "image",
      branch_ids: [],
      businessID: "",
      category_ids: [],
      clothing_type_id: "",
      content_ids: [],
      end_date: "",
      genders: [],
      images: [],
      influencer_amount: 0,
      is_bad_words_allowed: false,
      is_custom_text: false,
      prepared_text: "",
      publication_type: "reels",
      reward_by_rank: [],
      session_duration_sec: 0,
      start_date: "",
      tag_type: "together_with_influencer",
      visit_at_same_time_count: 0,
      work_hours_by_week_day: {
        monday: { open: "09:00", close: "18:00" },
        tuesday: { open: "09:00", close: "18:00" },
        wednesday: { open: "09:00", close: "18:00" },
        thursday: { open: "09:00", close: "18:00" },
        friday: { open: "09:00", close: "18:00" },
        saturday: { open: "09:00", close: "18:00" },
        sunday: { open: "09:00", close: "18:00" },
      },
      amount: 0,
      card_number: "",
      card_holder: "",
      cvc: "",
      expiry_month: "",
      expiry_year: "",
    },
  });

  return form;
};
