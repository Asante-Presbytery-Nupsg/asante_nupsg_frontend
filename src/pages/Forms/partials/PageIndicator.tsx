// components/PageIndicator.tsx
import React from "react";

type PageIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

const PageIndicator: React.FC<PageIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex justify-center mb-6 gap-2">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`h-1.5 w-16 md:w-20 rounded-full ${
            index === currentStep ? "bg-[#002A6E]" : "bg-gray-300"
          } transition-all duration-300`}
        />
      ))}
    </div>
  );
};

export default PageIndicator;
