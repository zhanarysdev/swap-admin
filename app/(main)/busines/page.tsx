"use client";
import { useDebounce } from "@/components/debuncer";
import { Header } from "@/components/header/header";
import { fetcher } from "@/fetcher";
import { useContext, useEffect } from "react";
import useSWR from "swr";
import {
  default_context,
  TableContext,
} from "@/components/temp/table-provider";
import Table from "@/components/temp/table";

const labels = [
  {
    key: "id",
    title: "ID",
  },
  {
    key: "name",
    title: "Название",
  },
  {
    key: "city",
    title: "Город",
    name: true,
  },
  {
    key: "taskCount",
    title: "Объявления",
  },
  {
    key: "category",
    title: "Категория",
    category: true,
  },
  {
    key: "balance",
    title: "Баланс",
  },
  {
    key: "displayNumber",
    title: "Контакт Мен.",
  },
  {
    key: "socialNetwork",
    title: "Соцсети",
    link: "https://www.instagram.com/",
  },
  {
    key: "lastTaskDate",
    title: "Последнее объявление",
    date: true,
  },
];

export default function BusinesPage() {
  const { context, setContext } = useContext(TableContext);
  const debouncedSearch = useDebounce(context.search, 500);

  const { data, isLoading } = useSWR(
    {
      url: `superadmin/v1/businesses/list?page=1&search=${debouncedSearch}&sortBy=${context.sortValue ?? ""}${context.filterValue.city ? `&city=${context.filterValue.city}` : ""}${context.filterValue.category ? `&categoryId=${context.filterValue.category}` : ""}`,
      custom: true,
    },
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 2000,
    },
  );

  useEffect(() => {
    setContext((prev) => ({ ...prev, isLoading }));
  }, [isLoading]);

  useEffect(() => {
    if (data?.result) {
      setContext((prev) => ({
        ...prev,
        data: data.result.items.map((el) => ({
          ...el,
          socialNetwork: `@${el.socialNetwork}`,
        })),
        labels: labels,
        goTo: "/busines",
        sort: ["name", "city", "category", "lastTaskDate"],
        filters: ["city", "category"],
      }));
    }
  }, [data, setContext]);

  useEffect(() => {
    return () => {
      setContext(default_context);
    };
  }, []);

  return (
    <div>
      <Header title={"Бизнес"} subTitle={"Информация"} />
      <Table />
    </div>
  );
}
