"use client";
import React from "react";
import { Button, ButtonBG } from "@/components/button/button";
import { Icon } from "@/components/icons";
import { Spinner } from "@/components/spinner/spinner";
import { fetcher, post } from "@/fetcher";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { ScheduleModal } from "@/components/input/schedule-modal";
import { WorkHoursByWeekDay, weekDaysMapLong } from "../components/step-two";

type PageParams = {
  id: string;
};

export default function AdsPage({ params }: { params: Promise<PageParams> }) {
  const { push } = useRouter();
  const [showScheduleModal, setShowScheduleModal] = React.useState(false);
  const resolvedParams = React.use(params);
  const { data, isLoading } = useSWR({ url: `business/v1/task/${resolvedParams.id}`, custom: true }, fetcher)
  const { data: ranksData } = useSWR({ url: "rank/list", data: { search: "", "sort_by": "name", "sort_dir": "asc" } }, post)

  if (isLoading) return <Spinner />

  const taskData = data?.result;
  const ranks = ranksData?.result || [];

  const getRankName = (rankId: string) => {
    const rank = ranks.find((r: any) => r.id === rankId);
    return rank?.name || 'Неизвестный ранг';
  };

  const getRankColor = (rankName: string) => {
    switch (rankName) {
      case 'bronze': return 'bg-[#FFD600]';
      case 'silver': return 'bg-[#C0C0C0]';
      case 'gold': return 'bg-[#FFD700]';
      case 'platinum': return 'bg-[#E5E4E2]';
      default: return 'bg-[#FFD600]';
    }
  };

  const getRankLabel = (rankName: string) => {
    switch (rankName) {
      case 'bronze': return 'Бронза';
      case 'silver': return 'Серебро';
      case 'gold': return 'Золото';
      case 'platinum': return 'Платина';
      default: return rankName;
    }
  };

  const archive = async () => {
    const res = await post({
      url: `business/v1/task/archive/${resolvedParams.id}`,
      custom: true,
      data: {}
    })
    if (res.message === "Task archived successfully") {
      push("/ads")
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-[64px]">
        <div>
          <Button
            preIcon={<Icon name="Caret" />}
            bg={ButtonBG.grey}
            label={"Назад"}
            onClick={() => push("/ads")}
          />
        </div>
        <div className="flex items-center gap-4">
          <Button
            preIcon={<Icon name="Archive" />}
            bg={ButtonBG.grey}
            label={"Архивировать"}
            onClick={archive}
          />
          <Button
            preIcon={<Icon name={"Eye"} />}
            bg={ButtonBG.grey}
            label={"Предпросмотр"}
          />
        </div>
      </div>
      <div className="flex gap-8 flex-col">
        <h1 className="text-[36px] font-bold leading-[40px] mb-8">{taskData?.categories[0]?.name}</h1>
        <div className="bg-[#383838] rounded-[32px] flex flex-col gap-[32px] p-6">
          <div className="flex gap-8">
            <div className="flex flex-col gap-4 max-w-[500px]">
              <h2 className="font-manrope font-semibold text-[20px] leading-[20px] tracking-[0%] mb-3">
                Информация о бизнесе
              </h2>
              <div className="grid grid-cols-[160px_1fr] gap-y-3 text-[15px]">
                <span className="text-[#A1A1A1]">Об объявлении:</span>
                <span>{taskData?.about}</span>
                <span className="text-[#A1A1A1]">Филиалы:</span>
                <span>
                  {taskData?.branches.map(branch => branch.address).join('\n')}
                </span>
                <span className="text-[#A1A1A1]">Текст для рекламы:</span>
                <span>{taskData?.prepared_text || 'Не указан'}</span>
                <span className="text-[#A1A1A1]">Ненормативная лексика:</span>
                <span>{taskData?.is_bad_words_allowed ? 'Допустима' : 'Не допустима'}</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 ">
              <h2 className="font-manrope font-semibold text-[20px] leading-[20px] tracking-[0%] mb-3">
                Информация об объявлении
              </h2>
              <div className="grid grid-cols-[160px_1fr] gap-y-3 text-[15px]">
                <span className="text-[#A1A1A1]">Создано:</span>
                <span>{new Date(taskData?.created_at || '').toLocaleDateString()}</span>
                <span className="text-[#A1A1A1]">Бюджет:</span>
                <span>{taskData?.budget} тг</span>
                <span className="text-[#A1A1A1]">Одежда:</span>
                <span>{taskData?.clothing_type_id}</span>
                <span className="text-[#A1A1A1]">Инфлюенсеров:</span>
                <span>{taskData?.taken} / {taskData?.influencer_amount}</span>
                <span className="text-[#A1A1A1]">Период:</span>
                <span>
                  {new Date(taskData?.start_date || '').toLocaleDateString()} - {new Date(taskData?.end_date || '').toLocaleDateString()}
                </span>
                <span className="text-[#A1A1A1]">Тип:</span>
                <span>{taskData?.publication_type}</span>
                <span className="text-[#A1A1A1]">Формат:</span>
                <span>{taskData?.ad_format}</span>
                <span className="text-[#A1A1A1]">Тип публикации:</span>
                <span>{taskData?.tag_type}</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 ml-auto">
              <div onClick={() => setShowScheduleModal(true)} className="bg-[#212121] py-3 px-4 rounded-[16px] flex items-center gap-2 cursor-pointer">
                <Icon name="Calendar" />
                <span>График посещения</span>
              </div>

              {showScheduleModal && (
                <div onClick={e => e.stopPropagation()}>
                  <ScheduleModal
                    schedule={taskData?.working_hours?.map((hours) => ({
                      week_day: hours.week_day,
                      open_time: hours.open_time,
                      close_time: hours.close_time
                    })) || []}
                    onChange={(newSchedule) => {
                      const formattedSchedule = newSchedule.reduce((acc, item) => ({
                        ...acc,
                        [item.week_day]: {
                          open: item.open_time,
                          close: item.close_time
                        }
                      }), {} as WorkHoursByWeekDay);
                    }}
                    onClose={() => setShowScheduleModal(false)}
                    weekDaysMap={weekDaysMapLong}
                  />
                </div>
              )}
            </div>

          </div>
          {/* Rewards Section */}
          <div className="mt-8">
            <h2 className="font-manrope font-semibold text-[20px] leading-[20px] tracking-[0%] mb-3">
              Вознаграждения
            </h2>
            <div className="grid grid-cols-2 gap-4 max-w-[600px]">
              {taskData?.rewards_by_rank.map((reward) => (
                <div key={reward.id} className="flex items-center gap-2 bg-[#212121] rounded-[12px] px-4 py-3">
                  <span className={`w-3 h-3 rounded-full ${getRankColor(getRankName(reward.rank_id))} inline-block`}></span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{getRankLabel(getRankName(reward.rank_id))}</span>
                    <span className="text-xs text-[#A1A1A1]">{reward.reward || 'Не указано'}</span>
                  </div>
                  <span className="ml-auto">▼</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
