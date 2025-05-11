'use client';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../libs";
import { Navigation } from "swiper/modules";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const SwiperContainer: React.FC<Props> = ({ className, children }) => {
  const swiperRef = React.useRef<any>(null);

  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);

  return (
    <div className={cn("relative", className)}>
      {/* Левая стрелка */}
      {!isBeginning && (
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronLeft />
        </button>
      )}

      {/* Правая стрелка */}
      {!isEnd && (
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronRight />
        </button>
      )}
      
      <Swiper
        className={className}
        modules={[Navigation]}
        slidesPerView="auto"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
          console.log("Swiper initialized:", swiper.isBeginning, swiper.isEnd); // Лог
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
          console.log("Slide changed:", swiper.isBeginning, swiper.isEnd); // Лог
        }}
      >
        {children}
      </Swiper>
    </div>
  );
};
