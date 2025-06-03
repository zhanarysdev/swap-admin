import React from "react";

export function TimePicker24({ value, onChange, className = "" }: {
    value: string;
    onChange: (val: string) => void;
    className?: string;
}) {
    const [hour = "00", minute = "00"] = value.split(":");
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

    return (
        <div className={`flex gap-1 items-center ${className}`}>
            <select
                value={hour}
                onChange={e => onChange(`${e.target.value}:${minute}`)}
                className="bg-[#212121] text-white rounded-xl px-2 py-1 outline-none text-base"
            >
                {hours.map(h => (
                    <option key={h} value={h}>{h}</option>
                ))}
            </select>
            :
            <select
                value={minute}
                onChange={e => onChange(`${hour}:${e.target.value}`)}
                className="bg-[#212121] text-white rounded-xl px-2 py-1 outline-none text-base"
            >
                {minutes.map(m => (
                    <option key={m} value={m}>{m}</option>
                ))}
            </select>
        </div>
    );
} 