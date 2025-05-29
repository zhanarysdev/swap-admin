import { Button } from "@/components/button/button";
import { ButtonBG } from "@/components/button/button";
import { Label } from "@/components/input/label";
import { Icon } from "@/components/icons";
import { Controller } from "react-hook-form";
import { Select } from "@/components/select/select";
const weekDaysMap: { [key: string]: string } = {
  'monday': 'Пн',
  'tuesday': 'Вт',
  'wednesday': 'Ср',
  'thursday': 'Чт',
  'friday': 'Пт',
  'saturday': 'Сб',
  'sunday': 'Вс'
};
const timeMap = [
  {
    "week_day": "sunday",
    "open_time": "09:00",
    "close_time": "18:00"
  },
  {
    "week_day": "monday",
    "open_time": "09:00",
    "close_time": "18:00"
  },
  {
    "week_day": "tuesday",
    "open_time": "09:00",
    "close_time": "18:00"
  },
  {
    "week_day": "wednesday",
    "open_time": "09:00",
    "close_time": "18:00"
  },
  {
    "week_day": "thursday",
    "open_time": "09:00",
    "close_time": "18:00"
  },
  {
    "week_day": "friday",
    "open_time": "09:00",
    "close_time": "18:00"
  },
  {
    "week_day": "saturday",
    "open_time": "09:00",
    "close_time": "18:00"
  }
]
export const StepTwo = ({ form }) => {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-4 w-[342px] shrink-0">

        <div className="flex flex-col gap-2 w-full">
          <Label label="Дата" />
          <div className="flex gap-2">
            <Button
              label="Начало"
              preIcon={<Icon name="Calendar" className={`${form.watch("start_date") ? "text-black" : "text-[#AAAAAA]"}`} />}
              styles="w-full items-center justify-center"
              bg={
                form.watch("start_date")
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "start_date",
                  form.watch("start_date")
                    ? form.watch("start_date").filter((el) => el !== "start_date")
                    : [...form.watch("start_date"), "start_date"]
                );
              }}
            />
            <Button
              label="Конец"
              preIcon={<Icon name="Calendar" className={`${form.watch("end_date") ? "text-black" : "text-[#AAAAAA]"}`} />}
              styles="w-full items-center justify-center"
              bg={
                form.watch("end_date")
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "end_date",
                  form.watch("end_date")
                    ? form
                      .watch("end_date")
                      .filter((el) => el !== "end_date")
                    : [...form.watch("end_date"), "end_date"]
                );
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label label="Время посещения (до)" />
          <Controller
            control={form.control}
            name="session_duration_sec"
            render={({ field }) => (
              <Select
                data={String(field.value)}
                placeholder="Время посещения (до)"
                options={[
                  { label: "2", value: "2" },
                  { label: "4", value: "4" },
                  { label: "8", value: "8" },
                ]}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label label="Одновременное посещение (до)" />
          <Controller
            control={form.control}
            name="visit_at_same_time_count"
            render={({ field }) => (
              <Select
                data={String(field.value)}
                placeholder="Одновременное посещение (до)"
                options={[
                  { label: "2", value: "2" },
                  { label: "4", value: "4" },
                  { label: "8", value: "8" },
                ]}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-full">
          <Label label="График посещения" />
          <div className="flex flex-col gap-2">
            {timeMap.map((el) => {
              return (
                <div
                  key={el.week_day}
                  className="flex justify-between bg-[#383838] rounded-2xl py-[9px] gap-4 items-center px-[25px]"
                >
                  <div>{weekDaysMap[el.week_day.toLowerCase()] || el.week_day}</div>
                  <div className="flex gap-2 items-center">
                    <div className="bg-[#212121] px-3 py-2 rounded-2xl">
                      {el.open_time}
                    </div>
                    -
                    <div className="bg-[#212121] px-3 py-2 rounded-2xl">
                      {el.close_time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
