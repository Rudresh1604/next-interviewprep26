import React from "react";
import TestimonalCard from "./TestimonalCard";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonal = () => {
  return (
    <div className="mt-12  p-3  rounded-lg">
      <div className="text-center">
        <h2 className="text-3xl lg:text-5xl mb-2 font-medium text-blue-600 animate-bounce">
          What people are saying
        </h2>
        <p className="lg:text-xl py-2">
          There are even more experience ! So what are you waiting for ?
        </p>
        <p className="animate-caret-blink">Contact Now</p>
      </div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          loop: true,
        }}
        className="mt-8"
      >
        <CarouselContent>
          <CarouselItem className=" md:basis-1/2 lg:basis-1/2">
            {/* <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 p-3 gap-2"> */}
            <TestimonalCard rating={5} />

            {/* </div> */}
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/2">
            {/* <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 p-3 gap-2"> */}
            <TestimonalCard rating={3} />

            {/* </div> */}
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/2">
            {/* <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 p-3 gap-2"> */}
            <TestimonalCard rating={4} />

            {/* </div> */}
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/2">
            {/* <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 p-3 gap-2"> */}
            <TestimonalCard rating={5} />

            {/* </div> */}
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Testimonal;
