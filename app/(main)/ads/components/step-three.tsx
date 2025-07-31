import { Button, ButtonBG } from "@/components/button/button";
import { Icon } from "@/components/icons";
import { Label } from "@/components/input/label";
import { useState, useRef, useEffect } from "react";

export const StepThree = ({ form }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  const tipsImages = [
    "/tips/Frame 2085663570.png",
    "/tips/Frame 10477.png",
    "/tips/Frame 2085663570-4.png",
    "/tips/Frame 2085663570-3.png",
    "/tips/Frame 2085663570-2.png"
  ];

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < tipsImages.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

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
          <div className="relative bg-[#212121] rounded-2xl p-4">
            {/* Image Slider */}
            <div
              ref={sliderRef}
              className="relative overflow-hidden rounded-xl w-[242px] h-[232px] mx-auto"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="flex transition-transform duration-300 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {tipsImages.map((image, index) => (
                  <div key={index} className="w-[242px] h-[232px] flex-shrink-0">
                    <img
                      src={image}
                      alt={`Tip ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {tipsImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide
                    ? 'bg-white'
                    : 'bg-white/30 hover:bg-white/50'
                    }`}
                />
              ))}
            </div>

            {/* Slide Counter */}
            <div className="text-center mt-2 text-sm text-gray-400">
              {currentSlide + 1} / {tipsImages.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
