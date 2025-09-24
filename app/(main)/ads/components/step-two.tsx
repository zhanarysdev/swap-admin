import { Button, ButtonBG } from "@/components/button/button";
import { Icon } from "@/components/icons";
import { InputCalendar } from "@/components/input/input-calendar";
import { Label } from "@/components/input/label";
import { ScheduleModal } from "@/components/input/schedule-modal";
import { Select } from "@/components/select/select";
import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";

export const weekDaysMap: { [key: string]: string } = {
  'monday': 'Пн',
  'tuesday': 'Вт',
  'wednesday': 'Ср',
  'thursday': 'Чт',
  'friday': 'Пт',
  'saturday': 'Сб',
  'sunday': 'Вс'
};

export const weekDaysMapLong = {
  'monday': 'Понедельник',
  'tuesday': 'Вторник',
  'wednesday': 'Среда',
  'thursday': 'Четверг',
  'friday': 'Пятница',
  'saturday': 'Суббота',
  'sunday': 'Воскресенье'
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

export interface WorkHours {
  open: string;
  close: string;
}

export interface WorkHoursByWeekDay {
  [key: string]: WorkHours;
}

export const StepTwo = ({ form }) => {
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [editingTime, setEditingTime] = useState<{ day: string; type: 'open' | 'close' } | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Debug: Log current form values to help identify validation issues
  const currentValues = form.watch();
  console.log('Step 2 Form Values:', currentValues);
  console.log('Step 2 Form Errors:', form.formState.errors);

  // Ensure work hours are properly initialized
  useEffect(() => {
    const workHours = form.getValues("work_hours_by_week_day");
    if (!workHours || Object.keys(workHours).length === 0) {
      form.setValue("work_hours_by_week_day", {
        monday: { open: "09:00", close: "18:00" },
        tuesday: { open: "09:00", close: "18:00" },
        wednesday: { open: "09:00", close: "18:00" },
        thursday: { open: "09:00", close: "18:00" },
        friday: { open: "09:00", close: "18:00" },
        saturday: { open: "09:00", close: "18:00" },
        sunday: { open: "09:00", close: "18:00" },
      });
    }
  }, [form]);

  const handleTimeChange = (day: string, type: 'open' | 'close', value: string) => {
    const currentHours = form.getValues("work_hours_by_week_day") || {};
    form.setValue("work_hours_by_week_day", {
      ...currentHours,
      [day]: {
        ...currentHours[day],
        [type]: value
      }
    });
    setEditingTime(null);
  };

  const formatDate = (date: Date | null) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return null;
    }
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  };

  const formatDateForDisplay = (date: Date | null) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return null;
    }
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="flex gap-6 ">
      {/* Debug panel - remove this after fixing */}
      <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs z-50 max-w-xs">
        <h3 className="font-bold mb-2">Step 2 Validation Debug:</h3>
        <div>Start Date: {currentValues.start_date ? '✅' : '❌'}</div>
        <div>End Date: {currentValues.end_date ? '✅' : '❌'}</div>
        <div>Session Duration: {currentValues.session_duration_sec} {currentValues.session_duration_sec > 0 ? '✅' : '❌'}</div>
        <div>Visit Count: {currentValues.visit_at_same_time_count} {currentValues.visit_at_same_time_count > 0 ? '✅' : '❌'}</div>
        <div>Work Hours: {Object.keys(currentValues.work_hours_by_week_day || {}).length} days {Object.keys(currentValues.work_hours_by_week_day || {}).length > 0 ? '✅' : '❌'}</div>
        <div className="mt-2 text-xs">
          Work Hours Details:
          {Object.entries(currentValues.work_hours_by_week_day || {}).map(([day, hours]) => {
            const typedHours = hours as WorkHours;
            return (
              <div key={day} className="ml-2">
                {day}: {typedHours?.open || '00:00'} - {typedHours?.close || '00:00'}
              </div>
            );
          })}
        </div>
        {Object.keys(form.formState.errors).length > 0 && (
          <div className="mt-2 text-red-400">
            Errors: {Object.keys(form.formState.errors).join(', ')}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 w-[342px] shrink-0">
        <div className="flex flex-col gap-2 w-full">
          <Label label="Дата" />
          <div className="flex gap-2 relative">
            <Button
              label={formatDateForDisplay(form.watch("start_date")) || "Начало"}
              type="button"
              preIcon={<Icon name="Calendar" className={`${form.watch("start_date") ? "text-black" : "text-[#AAAAAA]"}`} />}
              styles="w-full items-center justify-center"
              bg={
                form.watch("start_date")
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => setShowStartCalendar(true)}
            />
            {showStartCalendar && (
              <div className="absolute top-full left-0 z-10 mt-2">
                <InputCalendar
                  value={form.watch("start_date")}
                  onChange={(date) => {
                    if (date) {
                      form.setValue("start_date", date);
                    }
                    setShowStartCalendar(false);
                  }}
                  placeholder="Выберите дату"
                />
              </div>
            )}
            <Button
              label={formatDateForDisplay(form.watch("end_date")) || "Конец"}
              type="button"
              preIcon={<Icon name="Calendar" className={`${form.watch("end_date") ? "text-black" : "text-[#AAAAAA]"}`} />}
              styles="w-full items-center justify-center"
              bg={
                form.watch("end_date")
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => setShowEndCalendar(true)}
            />
            {showEndCalendar && (
              <div className="absolute top-full left-0 z-10 mt-2">
                <InputCalendar
                  value={form.watch("end_date")}
                  onChange={(date) => {
                    if (date) {
                      form.setValue("end_date", date);
                    }
                    setShowEndCalendar(false);
                  }}
                  placeholder="Выберите дату"
                />
              </div>
            )}
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
                  { label: "2 часа", value: "2" },
                  { label: "4 часа", value: "4" },
                  { label: "8 часов", value: "8" },
                ]}
                onChange={(value) => field.onChange(parseInt(value))}
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
                onChange={(value) => field.onChange(parseInt(value))}
              />
            )}
          />
        </div>
      </div>

      <div
        className="flex flex-col gap-4"
        onClick={() => {
          if (!showScheduleModal) setShowScheduleModal(true);
        }}
        style={{ cursor: 'pointer' }}
      >
        <div className="flex flex-col gap-2 w-full">
          <Label label="График посещения" />
          {Object.entries(form.watch("work_hours_by_week_day") || {}).some(([_, hours]) => {
            const h = hours as WorkHours;
            return h.open === h.close;
          })}
          <div className="flex flex-col gap-2">
            {Object.entries(form.watch("work_hours_by_week_day") || {} as WorkHoursByWeekDay).map(([day, hours]) => {
              const typedHours = hours as WorkHours;
              return (
                <div
                  key={day}
                  className="flex justify-between bg-[#383838] rounded-2xl py-[9px] gap-4 items-center px-[25px]"
                >
                  <div>{weekDaysMap[day.toLowerCase()] || day}</div>
                  <div className="flex gap-2 items-center">
                    <div className="bg-[#212121] px-3 py-2 rounded-2xl w-[70px] text-center">{typedHours.open}</div>
                    -
                    <div className="bg-[#212121] px-3 py-2 rounded-2xl w-[70px] text-center">{typedHours.close}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {showScheduleModal && (
          <div onClick={e => e.stopPropagation()}>
            <ScheduleModal
              schedule={Object.entries(form.watch("work_hours_by_week_day") || {} as WorkHoursByWeekDay).map(([day, hours]) => {
                const typedHours = hours as WorkHours;
                return {
                  week_day: day,
                  open_time: typedHours.open,
                  close_time: typedHours.close
                };
              })}
              onChange={(newSchedule) => {
                const formattedSchedule = newSchedule.reduce((acc, item) => ({
                  ...acc,
                  [item.week_day]: {
                    open: item.open_time,
                    close: item.close_time
                  }
                }), {} as WorkHoursByWeekDay);
                form.setValue("work_hours_by_week_day", formattedSchedule);
              }}
              onClose={() => setShowScheduleModal(false)}
              weekDaysMap={weekDaysMapLong}
            />
          </div>
        )}
      </div>
    </div>
  );
};
