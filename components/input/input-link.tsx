export function InputLink({
  value,
  label,
}: {
  value?: string;
  label: string | string[] | { name: string };
}) {
  return (
    <a
      href={value ? value : "#"}
      className={`bg-[#333333] w-full flex ${
        value ? "cursor-pointer" : "cursor-default"
      } rounded-2xl py-[16px] h-[52px] px-[25px] text-base leading-5 font-medium`}
    >
      {typeof label !== "object"
        ? label
        : Array.isArray(label)
        ? label.map((el) => el)
        : label?.name}
    </a>
  );
}
