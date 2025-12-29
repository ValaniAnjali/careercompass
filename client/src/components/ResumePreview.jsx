import React from "react";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import CustomTemplate from "./templates/CustomTemplate";

const ResumePreview = ({
  data,
  template,
  accentColor,
  bgColor = "#ffffff",
  textColor = "#000000",
  fontFamily = "Inter",
  classes = "",
}) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div
      id="resume-preview"
      className={
        "border border-gray-200 print:shadow-none print:border-none " + classes
      }
    >
      <CustomTemplate
        bgColor={bgColor}
        textColor={textColor}
        fontFamily={fontFamily}
      >
        {renderTemplate()}
      </CustomTemplate>
    </div>
  );
};

export default ResumePreview;
