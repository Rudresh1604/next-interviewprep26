import Image from "next/image";
import React from "react";

const FeatureSectionCard = ({ feature, isImageLeft }) => {
  return (
    <div
      className={`
        flex items-center justify-between w-full mt-9 flex-col-reverse
        lg:flex-row ${!isImageLeft ? "lg:flex-row-reverse" : ""}
      `}
    >
      {/* Image */}
      <Image
        src={feature?.imageUrl}
        width={10}
        height={10}
        alt="Interview"
        className="w-full md:w-1/2 h-[300px] lg:h-[350px]"
      />

      {/* Text */}
      <div className="flex flex-col mt-6 lg:mt-0 lg:w-1/2 px-4">
        <h1 className="text-2xl font-medium md:text-4xl mb-2 md:mb-4 text-blue-700">
          {feature?.title}
        </h1>
        <h2 className="md:text-2xl font-medium text-blue-500 mb-3">
          {feature?.subtitle}
        </h2>
        <p className="text-gray-700">{feature?.description}</p>
      </div>
    </div>
  );
};

export default FeatureSectionCard;
