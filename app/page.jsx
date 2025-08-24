"use client";
import Lottie from "lottie-react";
import Image from "next/image";
import homeAnimation from "./../lib/constants/interviewComplete.json";
import { Button } from "@/components/ui/button";
import Testimonal from "@/components/HomePage/Testimonal";
import FeatureSection from "@/components/HomePage/FeatureSection";
import Footer from "@/components/HomePage/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-200">
      <div className="py-8 px-7 md:pt-12 md:px-10 bg-white flex flex-col">
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
          <Lottie
            className="w-auto md:w-[400pc]"
            animationData={homeAnimation}
          />
        </div>
        <div className="flex flex-row gap-3 mt-9 max-sm:mt-5">
          <Button
            asChild
            className="w-1/2 h-auto text-white bg-black p-3 hover:bg-gray-800 cursor-pointer hover:text-white"
            variant="outline"
          >
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild className="w-1/2 cursor-pointer h-auto p-3">
            <Link href="/signin">Already User ?</Link>
          </Button>
        </div>
        <div>
          <FeatureSection />
        </div>
      </div>
      <Testimonal />
      <Footer />
    </div>
  );
}
