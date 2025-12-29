const CustomTemplate = ({
  children,
  bgColor = "#ffffff",
  textColor = "#000000",
  fontFamily = "Inter",
  fontSize = "16px",
  lineHeight = "1.6",
  classes = "",
}) => {
  return (
    <div
      className={`max-w-4xl mx-auto p-8 ${classes}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontFamily,
        fontSize,
        lineHeight,
        transition: "all 0.25s ease",
      }}
    >
      {children}
    </div>
  );
};

export default CustomTemplate;
