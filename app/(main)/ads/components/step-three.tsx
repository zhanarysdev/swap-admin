import { Button, ButtonBG } from "@/components/button/button";
import { Icon } from "@/components/icons";
import { Label } from "@/components/input/label";

export const StepThree = ({ form }) => {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-4 w-[342px] shrink-0">
        <div className="flex flex-col gap-2 w-full">
          <Label label="Тип публикации" />
          <div className="flex gap-2">
            <Button
              label="Post"
              type="button"
              styles="w-full items-center justify-center"
              bg={
                form.watch("publication_type") === "post"
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "publication_type",
                  form.watch("publication_type") === "post" ? "" : "post"
                );
              }}
            />
            <Button
              label="Story"
              type="button"
              styles="w-full items-center justify-center"
              bg={
                form.watch("publication_type") === "story"
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "publication_type",
                  form.watch("publication_type") === "story" ? "" : "story"
                );
              }}
            />
            <Button
              label="Reels"
              type="button"
              styles="w-full items-center justify-center"
              bg={
                form.watch("publication_type") === "reels"
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "publication_type",
                  form.watch("publication_type") === "reels" ? "" : "reels"
                );
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label label="Тип рекламы" />
          <div className="flex gap-2">
            <Button
              label="Фото"
              type="button"
              styles="w-full items-center justify-center"
              bg={
                form.watch("ad_format") === "image"
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "ad_format",
                  form.watch("ad_format") === "image" ? "" : "image"
                );
              }}
            />
            <Button
              label="Видео"
              type="button"
              styles="w-full items-center justify-center"
              bg={
                form.watch("ad_format") === "video"
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "ad_format",
                  form.watch("ad_format") === "video" ? "" : "video"
                );
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label label="Тип размещения" />
          <div className="flex gap-2">
            <Button
              label="Совместно"
              type="button"
              styles="w-full items-center justify-center"
              bg={
                form.watch("tag_type") === "together_with_influencer"
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "tag_type",
                  form.watch("tag_type") === "together_with_influencer"
                    ? ""
                    : "together_with_influencer"
                );
              }}
            />
            <Button
              label="Одиночное"
              type="button"
              styles="w-full items-center justify-center"
              bg={
                form.watch("tag_type") === "separate"
                  ? ButtonBG.primary
                  : ButtonBG.grey
              }
              onClick={() => {
                form.setValue(
                  "tag_type",
                  form.watch("tag_type") === "separate" ? "" : "separate"
                );
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-full">
          <Label label="Инструкция" />
        </div>
      </div>
    </div>
  );
};
