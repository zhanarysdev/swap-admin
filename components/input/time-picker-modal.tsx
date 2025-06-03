import React, { useRef, useEffect, useState } from "react";

export function TimePickerModal({
    isOpen,
    value,
    onChange,
    onClose,
}: {
    isOpen: boolean;
    value: string;
    onChange: (val: string) => void;
    onClose: () => void;
}) {
    const [tempValue, setTempValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTempValue(value);
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen, value]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-[#232323] rounded-2xl p-8 flex flex-col items-center min-w-[320px] min-h-[220px] shadow-lg relative">
                <input
                    ref={inputRef}
                    type="time"
                    value={tempValue}
                    onChange={e => setTempValue(e.target.value)}
                    className="text-4xl bg-[#181818] text-white rounded-xl px-6 py-4 mb-8 outline-none w-[200px] text-center"
                />
                <div className="flex gap-4">
                    <button
                        className="bg-[#BEFF1B] text-[#212121] font-bold rounded-xl px-8 py-2 text-lg hover:bg-[#d6ff5c] transition"
                        onClick={() => {
                            onChange(tempValue);
                            onClose();
                        }}
                    >
                        Сохранить
                    </button>
                    <button
                        className="bg-[#333] text-white font-bold rounded-xl px-8 py-2 text-lg hover:bg-[#444] transition"
                        onClick={onClose}
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
} 