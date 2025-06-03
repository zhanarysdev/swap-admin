import React, { useState } from "react";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

export function ScheduleModal({
    schedule,
    onChange,
    onClose,
    weekDaysMap,
}: {
    schedule: { week_day: string; open_time: string; close_time: string }[];
    onChange: (newSchedule: { week_day: string; open_time: string; close_time: string }[]) => void;
    onClose: () => void;
    weekDaysMap: { [key: string]: string };
}) {
    const [tempSchedule, setTempSchedule] = useState(schedule);

    const handleTimeChange = (day: string, type: 'open' | 'close', value: string) => {
        setTempSchedule(prev => prev.map(item =>
            item.week_day === day ? { ...item, [type === 'open' ? 'open_time' : 'close_time']: value } : item
        ));
    };

    return (
        <div className="absolute w-full top-0 bottom-0 left-0 right-0 inset-0 z-50 flex items-center justify-center bg-black rounded-2xl">
            <div className="bg-[#232323] h-full w-full rounded-2xl p-8 py-4 flex flex-col shadow-lg relative min-w-[400px]">
                {/* Close Icon */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-[#BEFF1B] transition p-2 rounded-full focus:outline-none"
                    aria-label="Закрыть"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <style jsx global>{`
                  .react-time-picker {
                    background: #212121;
                    border-radius: 0.75rem;
                    border: none;
                  }
                  .react-time-picker__inputGroup input {
                    background: #212121;
                    color: #fff;
                    border-radius: 0.75rem;
                  }
                  .react-time-picker__wrapper {
                    background: #212121;
                    border: none;
                    height: 40px;
                    box-shadow: none;
                    padding: 8px 12px;
                    border-radius: 0.75rem;
                  }
                  .react-time-picker__clock {
                    background: #232323;
                  }
                  .react-time-picker__clear-button,
                  .react-time-picker__clock-button {
                    display: none;
                  }
                `}</style>
                <div className="flex flex-col gap-4 overflow-y-auto">
                    <div className="text-xl font-bold text-white mb-4">График посещения</div>
                    {tempSchedule.map((el) => (
                        <div
                            key={el.week_day}
                            className="flex h-[58px] justify-between items-center bg-[#383838] rounded-2xl py-[9px] px-[25px] gap-4"
                        >
                            <div className="text-base text-white w-32">{weekDaysMap[el.week_day.toLowerCase()] || el.week_day}</div>
                            <div className="flex gap-2 items-center">
                                <TimePicker
                                    onChange={val => handleTimeChange(el.week_day, 'open', val as string)}
                                    value={el.open_time}
                                    format="HH:mm"
                                    disableClock={true}
                                    clearIcon={null}
                                    clockIcon={null}
                                    className="w-[90px]"
                                />
                                <span className="text-white text-base">-</span>
                                <TimePicker
                                    onChange={val => handleTimeChange(el.week_day, 'close', val as string)}
                                    value={el.close_time}
                                    format="HH:mm"
                                    disableClock={true}
                                    clearIcon={null}
                                    clockIcon={null}
                                    className="w-[90px]"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 