import { Input } from "@/components/input/input";
import { Label } from "@/components/input/label";

export const StepFour = ({ form }) => {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-4 w-[608px] shrink-0">
        <div className="flex flex-col gap-2">
          <Label label="Для бронзового инфлюэнсера" />
          <Input
            placeholder="Вознаграждение"
            value={form.watch("reward")}
            onChange={(e) => form.setValue("reward", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label label="Для серебряного инфлюэнсера" />
          <Input
            placeholder="Вознаграждение"
            value={form.watch("reward")}
            onChange={(e) => form.setValue("reward", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label label="Для золотого инфлюэнсера" />
          <Input
            placeholder="Вознаграждение"
            value={form.watch("reward")}
            onChange={(e) => form.setValue("reward", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label label="Для платинового инфлюэнсера" />
          <Input
            placeholder="Вознаграждение"
            value={form.watch("reward")}
            onChange={(e) => form.setValue("reward", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
