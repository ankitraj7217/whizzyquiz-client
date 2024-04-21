import React from "react";
import CustomButton from "../CustomButton";
import { quizInstructions } from "../../Utils/Data/quizData";

import "./Instructions.scss";

const Instructions = ({
  isActive = true,
  setIsActive = () => {},
  setShowQuiz = () => {},
}) => {
  return (
    <section className={`inst ${isActive && "active"}`}>
      <h2>Quiz Instructions</h2>
      <div className="inst-info">
        {quizInstructions.map((ele, idx) => {
          return (
            <span className="inst-info-detail" key={idx}>
              {ele}
            </span>
          );
        })}
      </div>
      <div className="inst-btn-group">
        <div className="inst-btn-group-exit">
          <CustomButton
            bgColor="transparent"
            txtColor="#0d0de7"
            hoverBgColor="#2323f4"
            hovertxtColor="#fff"
            border="2px solid #0d0de7"
            borderRadius="0.5rem"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
            txt="Exit Quiz"
            onClickFunc={() => setIsActive(false)}
          />
        </div>
        <div className="inst-btn-group-continue">
          <CustomButton
            bgColor="#0d0de7"
            txtColor="#fff"
            hoverBgColor="#2323f4"
            hovertxtColor="#fff"
            border="2px solid #0d0de7"
            borderRadius="0.5rem"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
            txt="Continue"
            onClickFunc={() => {
              setIsActive(false);
              setShowQuiz(true);
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Instructions;
