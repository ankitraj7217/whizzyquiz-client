import React, { useState } from "react";
import CustomButton from "../CustomButton";

import "./Quiz.scss";
import {
  quizResultDetailsExplanation,
  sampleQuestionOptionsList,
} from "../../Utils/Data/quizData";

const Quiz = ({showQuizPage, setShowQuizPage}) => {
  const [currQuestionIdx, setCurrQuestionIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedQuestionOption, setSelectedQuestionOption] = useState(new Array(5).fill(-1));
  const [showResultDetails, setShowResultDetails] = useState(false);

  const _onNextFinishClick = () => {
    if (currQuestionIdx === sampleQuestionOptionsList.length - 1) {
      setShowResult(true);
    } else {
      setCurrQuestionIdx((prevIdx) => prevIdx + 1);
    }
  };

  const _onOptionClick = (optionIdx) => {
    setSelectedQuestionOption((prevValue) => {
      const newSelectedOptions = [...prevValue];
      newSelectedOptions[currQuestionIdx] = optionIdx;
      return newSelectedOptions;
    });
  };

  return (
    <section className="quiz" style={{left: showQuizPage ? "-50%" : "-100%"}}>
      {!showResult ? (
        <div className={`quiz-box ${showQuizPage ? "active" : ""}`}>
          <h1>Whizzy Quiz</h1>
          <div className="quiz-box-header">
            <span className="quiz-box-header__title">Software Dvpt. Quiz</span>
            <span className="quiz-box-header__question-no">{`Question: ${
              currQuestionIdx + 1
            } / 5`}</span>
          </div>
          <div className="quiz-box-question-txt">
            {sampleQuestionOptionsList[currQuestionIdx]?.question}
          </div>
          <div className="quiz-box-option-list">
            {sampleQuestionOptionsList[currQuestionIdx]?.options.map(
              (ele, idx) => {
                return (
                  <div
                    className={`quiz-box-option-list__option ${
                      selectedQuestionOption?.[currQuestionIdx] === idx
                        ? "selected"
                        : ""
                    }`}
                    key={idx}
                    onClick={() => _onOptionClick(idx)}
                  >
                    <span>{ele}</span>
                  </div>
                );
              }
            )}
          </div>
          <div className="quiz-box-btn-group">
            <div className="quiz-box-btn-group-exit">
              <CustomButton
                bgColor="transparent"
                txtColor="#c40094"
                hoverBgColor="#c40094"
                hovertxtColor="#fff"
                border="2px solid #c40094"
                borderRadius="0.5rem"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
                txt="Previous"
                disabled={currQuestionIdx === 0 ? true : false}
                onClickFunc={() => setCurrQuestionIdx((prevIdx) => prevIdx - 1)}
              />
            </div>
            <div className="quiz-box-btn-group-continue">
              <CustomButton
                bgColor="#c40094"
                txtColor="#fff"
                hoverBgColor="#950170"
                hovertxtColor="#fff"
                border="2px solid #c40094"
                borderRadius="0.5rem"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
                txt={
                  currQuestionIdx === sampleQuestionOptionsList.length - 1
                    ? "Finish"
                    : "Next"
                }
                onClickFunc={_onNextFinishClick}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="quiz-result">
          <h2>Quiz Result!</h2>
          <div className="quiz-result-container">
            <div className="quiz-result-container-progress">
              <span className="quiz-result-container-progress-value">0%</span>
            </div>
            <span className="quiz-result-container-score">
              Your Score is 0 out of 5
            </span>
          </div>
          <div className="quiz-result-btn-group">
            <div className="quiz-result-btn-group-try-again">
              <CustomButton
                bgColor="transparent"
                txtColor="#c40094"
                hoverBgColor="#c40094"
                hovertxtColor="#fff"
                border="2px solid #c40094"
                borderRadius="0.25rem"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
                txt="Try Again"
                disabled={currQuestionIdx === 0 ? true : false}
                onClickFunc={() => {
                  setShowResult(false);
                  setCurrQuestionIdx(0);
                }}
              />
            </div>
            <div className="quiz-result-btn-group-go-to-home">
              <CustomButton
                bgColor="#c40094"
                txtColor="#fff"
                hoverBgColor="#950170"
                hovertxtColor="#fff"
                border="2px solid #c40094"
                borderRadius="0.25rem"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
                txt="Go To Home"
                onClickFunc={() => {
                  setShowResult(false);
                  setCurrQuestionIdx(0);
                  setShowQuizPage(false)
                }}
              />
            </div>
            <div className="quiz-result-btn-group-explanation">
              <CustomButton
                bgColor="transparent"
                txtColor="#c40094"
                hoverBgColor="#c40094"
                hovertxtColor="#fff"
                border="2px solid #c40094"
                borderRadius="0.25rem"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
                txt="Explanation"
                disabled={currQuestionIdx === 0 ? true : false}
                onClickFunc={() => setShowResultDetails(true)}
              />
            </div>
          </div>

          <div
            className={`quiz-result-details ${
              showResultDetails ? "active" : ""
            }`}
          >
            <div
              className="quiz-result-details-close"
              onClick={() => setShowResultDetails(false)}
            >
              &times;
            </div>
            <h2>Answer Details</h2>
            <pre>{quizResultDetailsExplanation}</pre>
          </div>
        </div>
      )}
    </section>
  );
};

export default Quiz;
