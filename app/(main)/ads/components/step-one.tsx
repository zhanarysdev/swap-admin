import { Button, ButtonBG } from "@/components/button/button";
import { Icon } from "@/components/icons";
import { InputFile } from "@/components/input/input-file";
import { Label } from "@/components/input/label";
import { Text } from "@/components/input/text";
import { Select } from "@/components/select/select";
import { Spinner } from "@/components/spinner/spinner";
import useProfile from "@/components/useProfile";
import { post } from "@/fetcher";
import { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import useSWR from "swr";
import { AdFormData } from "./useAdsForm";

export const StepOne = ({ form }: { form: UseFormReturn<AdFormData> }) => {
  const [count, setCount] = useState(0);
  const { profile, isLoading: isProfileLoading } = useProfile();

  const { data, isLoading } = useSWR(
    {
      url: "v1/business/category/list/all",
      data: {
        search: "",
        sort_by: "name",
        sort_dir: "asc",
      },
      custom: true,
    },
    post
  );

  if (isLoading || isProfileLoading) return <Spinner />;

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-4 w-[342px] shrink-0">
        <div className="flex flex-col gap-2 w-full">
          <Label label="Количество инфлюэнсеров (до)" />
          <Controller
            control={form.control}
            name="influencer_amount"
            render={({ field }) => (
              <Select
                data={String(field.value)}
                placeholder="Количество инфлюэнсеров (до)"
                options={[
                  { label: "5", value: "5" },
                  { label: "10", value: "10" },
                  { label: "15", value: "15" },
                ]}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label label="Категория инфлюенсера" />
          <Controller
            control={form.control}
            name="category_ids"
            render={({ field }) => (
              <Select
                placeholder="Категория"
                data={String(field.value)}
                options={data.result.map((el) => ({
                  label: el.name,
                  value: el.id,
                }))}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="flex gap-2">
          <Button
            label="Мужчина"
            styles="w-full items-center justify-center"
            bg={
              form.watch("genders").includes("male")
                ? ButtonBG.primary
                : ButtonBG.grey
            }
            onClick={() => {
              form.setValue(
                "genders",
                form.watch("genders").includes("male")
                  ? form.watch("genders").filter((gender) => gender !== "male")
                  : [...form.watch("genders"), "male"]
              );
            }}
          />
          <Button
            label="Женщина"
            styles="w-full items-center justify-center"
            bg={
              form.watch("genders").includes("female")
                ? ButtonBG.primary
                : ButtonBG.grey
            }
            onClick={() => {
              form.setValue(
                "genders",
                form.watch("genders").includes("female")
                  ? form
                    .watch("genders")
                    .filter((gender) => gender !== "female")
                  : [...form.watch("genders"), "female"]
              );
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Controller
            control={form.control}
            name="branch_ids"
            render={({ field }) => (
              <Select
                data={String(field.value)}
                placeholder="Филиалы"
                options={profile?.branches.map((el) => ({
                  label: el.address,
                  value: el.id,
                }))}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Controller
            control={form.control}
            name="about"
            render={({ field }) => (
              <Text
                count={count}
                placeholder="Об акции"
                maxCount={300}
                value={String(field.value)}
                onChange={(e) => {
                  field.onChange(e);
                  setCount(e.target.value.length);
                }}
              />
            )}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label label="Фото 16:9 (до 3-х)" />
            <Controller
              control={form.control}
              name="images"
              render={({ field }) => (
                <InputFile
                  value={
                    Array.isArray(field.value) ? (field.value as File[]) : []
                  }
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex gap-2">
            {[...Array(3)].map((_, index) => {
              const image = form.watch("images")[index];
              return (
                <div key={index} className="w-[75px] h-[75px] relative">
                  {image ? (
                    <>
                      <button
                        onClick={() => {
                          const newImages = (
                            form.getValues("images") as File[]
                          ).filter((_, i) => i !== index);
                          form.setValue("images", newImages);
                        }}
                        className="absolute top-[4px] right-[4px] bg-black rounded-full p-1 w-[18px] h-[18px] flex items-center justify-center"
                      >
                        <Icon name="Close" />
                      </button>
                      <img
                        src={URL.createObjectURL(image as Blob)}
                        alt="Фото"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </>
                  ) : (
                    <div className="w-full h-full bg-[#333333] rounded-xl flex items-center justify-center">
                      <Icon
                        name="ImagePlaceholder"
                        className="text-[#AAAAAA]"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
