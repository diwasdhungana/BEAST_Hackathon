import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomCard from "./custom-card";

const CardCarousel = ({ cards }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative max-w-5xl mx-auto px-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-8px)] md:flex-[0_0_calc(33.33%-16px)]"
            >
              <CustomCard {...card} />
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CardCarousel;
