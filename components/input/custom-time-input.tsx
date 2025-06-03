import React, { useState, useRef, useEffect } from "react";

export function CustomTimeInput({
    value,
    onChange,
    className = "",
    autoFocus = false,
}: {
    value: string;
    onChange: (val: string) => void;
    className?: string;
    autoFocus?: boolean;
}) {
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [editing]);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleSave = () => {
        // Validate input: must be HH:mm, 00-23:00-59
        const match = inputValue.match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
        if (match) {
            onChange(inputValue);
        } else {
            setInputValue(value); // revert
        }
        setEditing(false);
    };

    return editing ? (
        <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value.replace(/[^0-9:]/g, ""))}
            onBlur={handleSave}
            onKeyDown={e => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") {
                    setInputValue(value);
                    setEditing(false);
                }
            }}
            className={`bg-[#212121] px-3 py-2 rounded-2xl text-white w-[70px] text-center outline-none ${className}`}
            placeholder="00:00"
            autoFocus={autoFocus}
            maxLength={5}
        />
    ) : (
        <div
            className={`bg-[#212121] px-3 py-2 rounded-2xl cursor-pointer w-[70px] text-center ${className}`}
            onClick={() => setEditing(true)}
        >
            {value}
        </div>
    );
} 