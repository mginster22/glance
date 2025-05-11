import React from "react";
import { Container } from "./container";
import { cn } from "./libs";
import { Title } from "./ui";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

interface Props {
  className?: string;
}

export const Banner: React.FC<Props> = ({ className }) => {
  return (
    <Container className={cn(" flex justify-center  mt-8", className)}>
      <div
        className={cn(
          "w-full h-[260px] max-sm:h-[180px] bg-black rounded-xl flex relative justify-center gap-[150px] py-8  max-sm:gap-8 max-sm:w-[380px] ",
          className
        )}
      >
        <CircleArrowLeft className="my-auto text-[#C1C1C1] text-2xl max-sm:text-sm max-sm:hidden" />
        <div className="flex flex-col w-[400px] max-sm:w-[200px] max-sm:px-2">
          <Title
            text="Умная колонка"
            className="text-[#F6F6F6] max-sm:text-[18px]"
            size="2xl"
          />

          <p className="whitespace-nowrap text-[#F6F6F6] max-w-[430px] flex flex-col text-xl mt-8 max-sm:text-[14px] max-sm:mt-1 ">
            <span className="text-[#EBBA1A] text-3xl max-sm:text-sm">
              СКИДКА 30%
            </span>{" "}
            при покупке второго товара
          </p>
        </div>
        <img
          src="/banner1.png"
          className="translate-y-[32px] max-sm:w-[120px] max-sm:h-[125px] max-sm:translate-y-[21px] max-sm:px-1"
        />
        <CircleArrowRight className="my-auto text-[#C1C1C1] text-2xl max-sm:hidden" />
      </div>
    </Container>
  );
};
