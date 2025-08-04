"use client";
import Lottie from "lottie-react";
import Image from "next/image";
import homeAnimation from "./../lib/constants/interviewComplete.json";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mt-8 mx-7 md:mt-12 md:mx-10 flex flex-col">
      <div className="flex flex-col justify-between items-center md:flex-row">
        <div className="flex flex-col gap-3 max-sm:items-center">
          <h1 className="text-4xl max-sm:text-2xl text-primary md:text-5xl font-extrabold">
            Welcome to AI Recruiter !{" "}
          </h1>
          <p className="max-sm:text-sm text-xl text-gray-500 md:my-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
            non consequuntur repudiandae, iure rerum corporis laboriosam unde
            magnam id delectus autem eum adipisci harum excepturi quas
            voluptates totam nostrum qui perferendis voluptate minus ut iusto,
            expedita illo. Molestiae, aliquam. Exercitationem, suscipit
            distinctio necessitatibus incidunt voluptatibus molestiae porro.
            Nostrum sed deleniti iste. Quaerat, facere aspernatur voluptates
            ipsam qui quidem, expedita assumenda fugit provident quia repellat
            commodi vel nulla libero dolores autem exercitationem ut quisquam,
            fuga eaque pariatur ea! Dolorum quae amet cum perferendis deserunt
            laboriosam ut facilis atque, dignissimos voluptas debitis
            accusantium rerum qui. Optio quos facilis explicabo natus sint
            quaerat.
          </p>
        </div>
        <Lottie className="w-auto md:w-[400pc]" animationData={homeAnimation} />
      </div>
      <div className="flex gap-3 mt-9 max-sm:mt-5">
        <Button className="w-1/2">Login</Button>
        <Button className="w-1/2">Sign Up</Button>
      </div>
    </div>
  );
}
