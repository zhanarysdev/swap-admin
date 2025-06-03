import { Icon } from "@/components/icons";
export const StepSix = ({ form }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="relative h-[811px] w-[375px] border-2 border-lightGrey rounded-[50px]">
        <div className="flex flex-col items-center justify-center w-full relative h-[341px]">
          <img src="/status_bar.png" alt="" className="absolute top-0 left-0 w-full  z-10" />
          <img src="/frame.png" alt="" className="absolute top-[52px] left-0 w-full z-10" />
          <img
            src={form.watch("images")?.[0]}
            className="absolute top-0 left-0 rounded-tr-[50px] h-[341px] object-cover rounded-tl-[50px]"
          />
        </div>
        <div className="bg-black rounded-[50px] absolute bottom-0 left-0 right-0 h-[516px]">
          <div className="flex flex-col items-center justify-center gap-2 pt-[28px] text-[#818181] font-[600] leading-5" >
            <span className="text-[#818181]">До {form.watch("end_date")}</span>
          </div>
          <div className="text-white text-center text-2xl leading-7 font-bold">{form.watch("business_name")}</div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="bg-[#212121] rounded-[10px] px-4 py-2">
              {form.watch("publication_type")}
            </div>
          </div>


          <div className="bg-[#BEFF1B] rounded-[16px] w-[343px] mx-auto p-4 flex gap-2">
            <Icon name="Sa" />
            <div className="flex flex-col  text-[#212121]">
              <div className="font-bold text-lg leading-6">Вы получите:</div>
              <div>{form.watch("reward")}</div>
            </div>
          </div>

          <div className="bg-[#333333] p-4 w-[343px] mx-auto rounded-[16px] mt-4 flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="flex gap-1">
                <Icon name="Info" />
                Задание
              </div>
              <div className="py-[6px] px-3 rounded-[16px] border text-[11px] font-normal">
                <div>Выполнить до {form.watch("end_date")}</div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};
