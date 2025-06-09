import { Input } from "@/components/input/input";
import { Label } from "@/components/input/label";
import { Spinner } from "@/components/spinner/spinner";
import { post } from "@/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";

const getLabel = (name) => {
  if (name === "bronze") return "Для бронзового инфлюэнсера"
  if (name === "silver") return "Для серебряного инфлюэнсера"
  if (name === "gold") return "Для золотого инфлюэнсера"
  if (name === "platinum") return "Для платинового инфлюэнсера"
}

export const StepFour = ({ form }) => {
  const [ranks, setRanks] = useState([])

  const { data, isLoading } = useSWR({
    url: "rank/list", data: {
      search: "", "sort_by": "name",
      "sort_dir": "asc"
    }
  }, post)

  useEffect(() => {
    if (data) {
      setRanks(data.result.map((el) => ({
        id: el.id,
        label: getLabel(el.name)
      })))
    }
  }, [data])

  if (isLoading) return <Spinner />

  const handleRewardChange = (rankId, value) => {
    const currentRewards = form.watch("reward_by_rank") || [];
    const existingRewardIndex = currentRewards.findIndex(r => r.rank_id === rankId);

    if (existingRewardIndex >= 0) {
      // Update existing reward
      const newRewards = [...currentRewards];
      newRewards[existingRewardIndex] = { rank_id: rankId, amount: (value) };
      form.setValue("reward_by_rank", newRewards);
    } else {
      // Add new reward
      form.setValue("reward_by_rank", [...currentRewards, { rank_id: rankId, amount: (value) }]);
    }
  };

  const getRewardValue = (rankId) => {
    const rewards = form.watch("reward_by_rank") || [];
    const reward = rewards.find(r => r.rank_id === rankId);
    return reward ? reward.amount : "";
  };

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-4 w-[608px] shrink-0">
        {ranks.length > 0 ? ranks.map(el => (
          <div className="flex flex-col gap-2" key={el.id}>
            <Label label={el.label} />
            <Input
              placeholder="Вознаграждение"
              value={getRewardValue(el.id)}
              onChange={(e) => handleRewardChange(el.id, e.target.value)}
            />
          </div>
        )) : null}
      </div>
    </div>
  );
};
