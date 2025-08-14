import Image from "next/image";
import React from "react";
import FeatureSectionCard from "./FeatureSectionCard";
import { CoreFeatures } from "@/lib/constants/constant";

const FeatureSection = () => {
  return (
    <div>
      {CoreFeatures?.map((feature, index) => (
        <FeatureSectionCard
          key={index}
          feature={feature}
          isImageLeft={index % 2}
        />
      ))}
    </div>
  );
};

export default FeatureSection;
