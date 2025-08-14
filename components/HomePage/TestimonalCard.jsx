"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";

const TestimonalCard = ({ rating }) => {
  return (
    <div className="p-5 ">
      <Card className="relative rounded-tl-[50px] bg-white">
        <CardHeader>
          <div className="flex">
            {[...Array(rating)].map((_, i) => (
              <StarIcon key={i} strokeWidth={0} fill="blue" />
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex gap-3 flex-col mb-20">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi,
            error eum illo ab non autem laudantium, itaque rerum quia sapiente
            odio dicta! Eaque architecto, officiis aspernatur nostrum assumenda
            eius officia libero incidunt, amet non facere excepturi. Maxime, a
            ex quam necessitatibus deleniti aut sunt commodi praesentium nostrum
            unde voluptatem amet?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos,
            aperiam.
          </p>
        </CardContent>
        <div className="flex items-center gap-3 font-medium mt-3 absolute bottom-0 left-[-20px]">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>John Doe </AvatarFallback>
          </Avatar>
          <div>
            <h1>John Doe CEO</h1>
            <h1>Lorem, ipsum dolor.</h1>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TestimonalCard;
