import { Button, ButtonBG } from "@/components/button/button";
import { Icon } from "@/components/icons";
import { Label } from "@/components/input/label";
import { Text } from "@/components/input/text";
import { Select } from "@/components/select/select";
import { MultiSelect } from "@/components/select/multi-select";
import { Spinner } from "@/components/spinner/spinner";
import useProfile from "@/components/useProfile";
import { post } from "@/fetcher";
import { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import useSWR from "swr";
import { AdFormData } from "./useAdsForm";

const ImageUploader = ({ value, onChange }: { value: string[], onChange: (urls: string[]) => void }) => {
  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://swapp-admin-stg-414022925388.us-central1.run.app/api/v1/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const files = Array.from(e.target.files);
        const uploadedUrls = await Promise.all(
          files.map(file => handleImageUpload(file))
        );
        console.log("-------->", uploadedUrls);
        const newUrls = uploadedUrls.slice(0, 3);
        onChange(newUrls);
      } catch (error) {
        console.error('Error handling images:', error);
      }
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        className="hidden"
        id="fileInput"
        multiple
        onChange={handleFileChange}
      />
      <label
        htmlFor="fileInput"
        className="bg-[#333333] w-[242px] h-[198px] gap-2 items-center justify-center cursor-pointer flex w-full placeholder:text-grey rounded-2xl py-[15px] px-[25px] text-base leading-5 font-medium"
      >
        {value.length > 0 ? (
          `${value.length} файлов выбрано`
        ) : (
          <>
            <Icon name="Upload" />
            <span className="text-[#AAAAAA]">Загрузить фото</span>
          </>
        )}
      </label>
    </div>
  );
};

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
              <MultiSelect
                data={field.value}
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
              <MultiSelect
                data={field.value}
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
              defaultValue={[]}
              render={({ field }) => (
                <ImageUploader
                  value={field.value || []}
                  onChange={(urls: string[]) => {
                    field.onChange(urls);
                  }}
                />
              )}
            />
          </div>
          <div className="flex gap-2">
            {[...Array(3)].map((_, index) => {
              const images = form.watch("images") || [];
              const imageUrl = images[index];
              return (
                <div key={index} className="w-[75px] h-[75px] relative">
                  {imageUrl ? (
                    <>
                      <button
                        onClick={() => {
                          const newImages = images.filter((_, i) => i !== index);
                          form.setValue("images", newImages);
                        }}
                        className="absolute top-[4px] right-[4px] bg-black rounded-full p-1 w-[18px] h-[18px] flex items-center justify-center"
                      >
                        <Icon name="Close" />
                      </button>
                      <img
                        src={imageUrl}
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
