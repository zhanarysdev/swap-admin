"use client";

import { Header } from "@/components/header/header";
import { Table } from "@/components/banner-prior/table/table"
import { TableContext } from "@/components/banner-prior/table/table-provider";
import { default_context } from "@/components/banner-prior/table/table-provider";
import { useContext, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/fetcher";

const labels = [
  {
    title: "ID транзакции",
    key: "id",
  },
  {
    title: "Дата транзакции",
    key: "date",
  },
  {
    title: "Сумма",
    key: "amount",
  },
]

export default function PaymentsPage() {
  const { context, setContext } = useContext(TableContext);
  const { data, isLoading } = useSWR({ url: "payment/list" }, fetcher)

  useEffect(() => {
    if (isLoading) {
      setContext((prev) => ({
        ...prev,
        isLoading: true,
      }));
    }
  }, [isLoading])

  useEffect(() => {
    setContext((prev) => ({
      ...prev,
      labels: labels,
    }));
  }, []);

  useEffect(() => {
    return () => {
      setContext(default_context)
    }
  }, [])

  return (
    <div>
      <Header title={"Платежи"} subTitle={"Информация"} />
      <TableContext.Provider value={{
        context: context,
        setContext: setContext
      }}>
        <Table labels={labels} data={[]} checked={[]} setChecked={() => { }} />
      </TableContext.Provider>
    </div>
  )
}