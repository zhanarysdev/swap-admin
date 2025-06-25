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
    businessID: yup.string().required("ID бизнеса обязателен"),
    category_ids: yup
      .array()
      .of(yup.string())
      .required("Выберите хотя бы одну категорию"),
    clothing_type_id: yup.string().required("Тип одежды обязателен"),
    content_type_id: yup.string().required("Тип контента обязателен"),
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
      .required("Укажите вознаграждение по рангам"),
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
      .object({
        monday: yup.object({
          open: yup.string().required("Время открытия обязательно"),
          close: yup.string().required("Время закрытия обязательно"),
        }).test('times-not-equal', 'Время открытия и закрытия не могут быть одинаковыми', function (value) {
          return value.open !== value.close;
        }),
        tuesday: yup.object({
          open: yup.string().required("Время открытия обязательно"),
          close: yup.string().required("Время закрытия обязательно"),
        }).test('times-not-equal', 'Время открытия и закрытия не могут быть одинаковыми', function (value) {
          return value.open !== value.close;
        }),
        wednesday: yup.object({
          open: yup.string().required("Время открытия обязательно"),
          close: yup.string().required("Время закрытия обязательно"),
        }).test('times-not-equal', 'Время открытия и закрытия не могут быть одинаковыми', function (value) {
          return value.open !== value.close;
        }),
        thursday: yup.object({
          open: yup.string().required("Время открытия обязательно"),
          close: yup.string().required("Время закрытия обязательно"),
        }).test('times-not-equal', 'Время открытия и закрытия не могут быть одинаковыми', function (value) {
          return value.open !== value.close;
        }),
        friday: yup.object({
          open: yup.string().required("Время открытия обязательно"),
          close: yup.string().required("Время закрытия обязательно"),
        }).test('times-not-equal', 'Время открытия и закрытия не могут быть одинаковыми', function (value) {
          return value.open !== value.close;
        }),
        saturday: yup.object({
          open: yup.string().required("Время открытия обязательно"),
          close: yup.string().required("Время закрытия обязательно"),
        }).test('times-not-equal', 'Время открытия и закрытия не могут быть одинаковыми', function (value) {
          return value.open !== value.close;
        }),
        sunday: yup.object({
          open: yup.string().required("Время открытия обязательно"),
          close: yup.string().required("Время закрытия обязательно"),
        }).test('times-not-equal', 'Время открытия и закрытия не могут быть одинаковыми', function (value) {
          return value.open !== value.close;
        }),
      })
      .required("Рабочие часы обязательны"),
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
      content_type_id: "",
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
    },
  });

  return form;
};
