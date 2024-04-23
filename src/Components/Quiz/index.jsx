import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton";

import "./Quiz.scss";
import { getFinalResult, getRandomQuestions } from "../../Network/QuizAPICalls";
import ResultExplanation from "./ResultExplanation";

const Quiz = ({ showQuizPage, setShowQuizPage }) => {
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [currQuestionIdx, setCurrQuestionIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedQuestionOption, setSelectedQuestionOption] = useState(
    new Array(5).fill(-1)
  );
  const [showResultDetails, setShowResultDetails] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [explanation, setExplanation] = useState([]);

  const _onNextFinishClick = () => {
    if (currQuestionIdx === randomQuestions?.length - 1) {
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

  const _resetState = () => {
    setCurrQuestionIdx(0);
    setShowResult(false);
    setSelectedQuestionOption(new Array(5).fill(-1));
    setShowResultDetails(false);
  };

  useEffect(() => {
    if (showResult) {
      const dataObj = [];
      const selectedOptions = {};
      for (let i = 0; i < selectedQuestionOption.length; i++) {
        const questionId = randomQuestions[i].questionId;
        dataObj.push({ questionId });
        selectedOptions[questionId] = selectedQuestionOption[i];
      }

      getFinalResult(dataObj, selectedOptions)
        .then((result) => {
          setFinalScore(result?.correctCnt);
          setExplanation(result?.explanationDetails);

          console.log("finalScore, explanation: ", result);
        })
        .catch((err) => console.error("Error while fetching result: ", err));
    }
  }, [showResult]);

  useEffect(() => {
    if (finalScore !== 0) {
      const circularProgressDiv = document.querySelector(
        ".quiz-result-container-progress"
      );
      const progressValueDiv = document.querySelector(
        ".quiz-result-container-progress-value"
      );

      let progressStartValue = 0;
      let progressEndValue = finalScore * (100 / randomQuestions.length);
      let speed = 20; // in milliseconds

      const progressInterval = setInterval(() => {
        progressStartValue += 1;

        progressValueDiv.textContent = `${progressStartValue}%`;
        circularProgressDiv.style.background = `conic-gradient(#c40094 ${
          progressStartValue * 3.6
        }deg, rgba(255, 255, 255, 0.1) 0deg)`;
        if (progressStartValue >= progressEndValue) {
          clearInterval(progressInterval);
        }
      }, speed);
    }
  }, [finalScore]);

  useEffect(() => {
    _resetState();
    if (showQuizPage) {
      getRandomQuestions()
        .then((questions) => setRandomQuestions(questions))
        .catch((err) =>
          console.error("Error while setting random question state: ", err)
        );
    }
  }, [showQuizPage]);

  return (
    <section className="quiz" style={{ left: showQuizPage ? "-50%" : "-100%" }}>
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
            {randomQuestions?.[currQuestionIdx]?.question}
          </div>
          <div className="quiz-box-option-list">
            {randomQuestions?.[currQuestionIdx]?.options.map((ele, idx) => {
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
            })}
          </div>
          <div className="quiz-box-btn-group">
            <div className="quiz-box-btn-group-exit">
              <CustomButton
                bgColor="transparent"
                txtColor="#0d0de7"
                hoverBgColor="#0d0de7"
                hovertxtColor="#fff"
                border="2px solid #0d0de7"
                borderRadius="0.5rem"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
                txt="Previous"
                disabled={currQuestionIdx === 0 ? true : false}
                onClickFunc={() => setCurrQuestionIdx((prevIdx) => prevIdx - 1)}
              />
            </div>
            <div className="quiz-box-btn-group-continue">
              <CustomButton
                bgColor="#0d0de7"
                txtColor="#fff"
                hoverBgColor="#2323f4"
                hovertxtColor="#fff"
                border="2px solid #0d0de7"
                borderRadius="0.5rem"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
                txt={
                  currQuestionIdx === randomQuestions?.length - 1
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
              Your Score is {finalScore} out of 5
            </span>
          </div>
          <div className="quiz-result-btn-group">
            <div className="quiz-result-btn-group-try-again">
              <CustomButton
                bgColor="transparent"
                txtColor="#0d0de7"
                hoverBgColor="#0d0de7"
                hovertxtColor="#fff"
                border="2px solid #0d0de7"
                borderRadius="0.25rem"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
                txt="Try Again"
                disabled={currQuestionIdx === 0 ? true : false}
                onClickFunc={_resetState}
              />
            </div>
            <div className="quiz-result-btn-group-go-to-home">
              <CustomButton
                bgColor="#0d0de7"
                txtColor="#fff"
                hoverBgColor="#2323f4"
                hovertxtColor="#fff"
                border="2px solid #0d0de7"
                borderRadius="0.25rem"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
                txt="Go To Home"
                onClickFunc={() => {
                  _resetState();
                  setShowQuizPage(false);
                }}
              />
            </div>
            <div className="quiz-result-btn-group-explanation">
              <CustomButton
                bgColor="transparent"
                txtColor="#0d0de7"
                hoverBgColor="#0d0de7"
                hovertxtColor="#fff"
                border="2px solid #0d0de7"
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
            <div className="quiz-result-details-expl">
              <ResultExplanation explanationDetails={explanation} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Quiz;
