import { Spinner } from "../spinner/spinner";
import useProfile from "../useProfile";

export function Header({
  title,
  subTitle = "Информация",
}: {
  title: string;
  subTitle: string;
}) {
  const { profile, isLoading, isError, mutate } = useProfile();
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className="mb-16 flex justify-between">
      <div className="flex flex-col gap-1">
        <div className="text-2xl font-bold leading-7">{title}</div>
        <div className="text-[#AAAAAA] font-semibold text-base leading-5">
          {subTitle}
        </div>
      </div>
      <div className="flex gap-1">
        <div className="py-3 px-4 bg-[#383838] rounded-[16px] flex items-center justify-center">Баланс: {profile?.balance} ₸</div>
      </div>
    </div>
  );
}
