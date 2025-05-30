import { Button, ButtonBG } from "@/components/button/button";
import { Icon } from "@/components/icons";
import { Label } from "@/components/input/label";

export const StepFive = ({ form }) => {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-4 w-[608px] shrink-0">

        <div className="flex flex-col gap-2 w-full">
          <Label label="Одежда" />
          <div className="flex gap-2">
            <Button
              label="Спортивная"
              styles="w-full items-center justify-center"
              bg={
                form.watch("start_date")
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "start_date",
                  form.watch("start_date")
                    ? form.watch("start_date").filter((el) => el !== "start_date")
                    : [...form.watch("start_date"), "start_date"]
                );
              }}
            />
            <Button
              label="Вечерняя"
              styles="w-full items-center justify-center"
              bg={
                form.watch("start_date")
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "start_date",
                  form.watch("start_date")
                    ? form.watch("start_date").filter((el) => el !== "start_date")
                    : [...form.watch("start_date"), "start_date"]
                );
              }}
            />
            <Button
              label="Повседневная"
              styles="w-full items-center justify-center"
              bg={
                form.watch("start_date")
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "start_date",
                  form.watch("start_date")
                    ? form.watch("start_date").filter((el) => el !== "start_date")
                    : [...form.watch("start_date"), "start_date"]
                );
              }}
            />
            <Button
              label="Без разницы"
              styles="w-full items-center justify-center"
              bg={
                form.watch("start_date")
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "start_date",
                  form.watch("start_date")
                    ? form.watch("start_date").filter((el) => el !== "start_date")
                    : [...form.watch("start_date"), "start_date"]
                );
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label label="Текст для рекламы" />
          <div className="flex gap-2">
            <Button
              label="Произв. положительный отзыв"
              styles="w-full items-center justify-center"
              bg={
                form.watch("start_date")
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "start_date",
                  form.watch("start_date")
                    ? form.watch("start_date").filter((el) => el !== "start_date")
                    : [...form.watch("start_date"), "start_date"]
                );
              }}
            />
            <Button
              label="Подготовленный текст"
              styles="w-full items-center justify-center"
              bg={
                form.watch("start_date")
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "start_date",
                  form.watch("start_date")
                    ? form.watch("start_date").filter((el) => el !== "start_date")
                    : [...form.watch("start_date"), "start_date"]
                );
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label label="Допустима ненормативная лексика?" />
          <div className="flex gap-2">
            <Button
              label="Допустима"
              styles="w-full items-center justify-center"
              bg={
                form.watch("start_date")
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "start_date",
                  form.watch("start_date")
                    ? form.watch("start_date").filter((el) => el !== "start_date")
                    : [...form.watch("start_date"), "start_date"]
                );
              }}
            />
            <Button
              label="Не допустима"
              styles="w-full items-center justify-center"
              bg={
                form.watch("start_date")
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "start_date",
                  form.watch("start_date")
                    ? form.watch("start_date").filter((el) => el !== "start_date")
                    : [...form.watch("start_date"), "start_date"]
                );
              }}
            />
          </div>
        </div>
      </div>

    </div>
  );
};
