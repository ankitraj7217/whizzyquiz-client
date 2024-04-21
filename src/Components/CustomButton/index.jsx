import React, { useState } from "react";

import "./CustomButton.scss";

const CustomButton = ({
  bgColor,
  txtColor,
  hoverBgColor,
  hovertxtColor,
  txt,
  border,
  borderRadius,
  boxShadow,
  onClickFunc,
  disabled = false
}) => {
  const [isHover, setIsHovered] = useState(false);

  const _handleMouseEnter = () => {
    setIsHovered(true);
  };
  const _handleMouseLeave = () => {
    setIsHovered(false);
  };

  const commonStyle = {
    transition: "0.5s",
    border: border,
    borderRadius: borderRadius,
    boxShadow: boxShadow
  }

  const normalStyle = {
    backgroundColor: bgColor,
    color: txtColor,
    ...commonStyle
  };

  const hoverStyle = {
    backgroundColor: hoverBgColor,
    color: hovertxtColor,
    ...commonStyle
  };
  

  return (
    <button
      className="custom-button"
      style={isHover ? hoverStyle : normalStyle}
      onClick={onClickFunc}
      onMouseEnter={_handleMouseEnter}
      onMouseLeave={_handleMouseLeave}
      disabled={disabled}
    >
      {txt}
    </button>
  );
};

export default CustomButton;
