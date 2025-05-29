import { ComponentProps, useState } from "react";
import { Icon } from "../icons";

type InputFileType = Omit<ComponentProps<"input">, 'value' | 'onChange'> & {
  value?: File[];
  onChange: (files: File[]) => void;
  placeholder?: string;
};

export function InputFile({ value = [], onChange, placeholder }: InputFileType) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      onChange(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(Array.from(e.target.files));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <div
      className={`w-full cursor-pointer ${dragActive ? 'border-2 border-dashed border-blue-500' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="hidden"
        id="fileInput"
        multiple
        onChange={handleChange}
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
            <span className="text-[#AAAAAA]">{placeholder}</span>
          </>
        )}
      </label>
    </div>
  );
}
