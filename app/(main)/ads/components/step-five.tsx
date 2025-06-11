import { Button, ButtonBG } from "@/components/button/button";
import { Icon } from "@/components/icons";
import { Label } from "@/components/input/label";
import { Spinner } from "@/components/spinner/spinner";
import { Text } from "@/components/input/text";
import { post } from "@/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Controller } from "react-hook-form";

export const StepFive = ({ form }) => {

  const clothes = useSWR({ url: "clothes/list", data: { search: "", "sort_by": "name", "sort_dir": "asc" } }, post)
  if (clothes.isLoading) return <Spinner />


  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-4 w-[608px] shrink-0">

        <div className="flex flex-col gap-2 w-full">
          <Label label="Одежда" />
          <div className="flex gap-2">
            {
              clothes.data.result.length > 0 && clothes.data.result.map((el) => (
                <Button
                  key={el.id}
                  label={el.name}
                  styles="w-full items-center justify-center"
                  bg={
                    form.watch("clothing_type_id") === el.id
                      ? ButtonBG.primary
                      : ButtonBG.grey
                  }
                  onClick={() => {
                    form.setValue(
                      "clothing_type_id",
                      el.id
                    );
                  }}
                />
              ))
            }
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label label="Текст для рекламы" />
          <div className="flex gap-2">
            <Button
              label="Произв. положительный отзыв"
              styles="w-full items-center justify-center"
              bg={
                form.watch("custom_text") === "Произв. положительный отзыв"
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue("custom_text", "Произв. положительный отзыв");
                form.setValue("prepared_text", false);
              }}
            />
            <Button
              label="Подготовленный текст"
              styles="w-full items-center justify-center"
              bg={
                form.watch("prepared_text")
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue("prepared_text", true);
                form.setValue("custom_text", "");
              }}
            />
          </div>
          {form.watch("prepared_text") && (
            <Controller
              control={form.control}
              name="prepared_text"
              render={({ field }) => (
                <Text
                  value={field.value}
                  count={field.value?.length || 0}
                  maxCount={150}
                  onChange={(e) => {
                    console.log(e.target.value)
                    field.onChange(e.target.value)
                  }}
                />
              )}
            />
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label label="Допустима ненормативная лексика?" />
          <div className="flex gap-2">
            <Button
              label="Допустима"
              styles="w-full items-center justify-center"
              bg={
                form.watch("is_bad_words_allowed")
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "is_bad_words_allowed",
                  true
                );
              }}
            />
            <Button
              label="Не допустима"
              styles="w-full items-center justify-center"
              bg={
                form.watch("is_bad_words_allowed")
                  ? ButtonBG.grey
                  : ButtonBG.primary
              }
              onClick={() => {
                form.setValue(
                  "is_bad_words_allowed",
                  false
                );
              }}
            />
          </div>
        </div>
      </div>

    </div>
  );
};
