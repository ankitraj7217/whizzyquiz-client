import React from "react";

import "./ResultExplanation.scss";

const ResultExplanation = ({ explanationDetails }) => {
  return (
    <section className="result-expl">
      {explanationDetails &&
        explanationDetails?.map((ele, idx) => {
          return (
            <div className="result-expl-qa" key={ele.questionId}>
              <div className="result-expl-qa-question">
                {`${idx + 1}. ${ele.question}`}
              </div>
              <div className="result-expl-qa-tags">
                <span>Topics:</span>{" "}
                {ele.tags.map((el, idx) => (
                  <span key={idx}>
                    {el}
                    {idx !== ele?.tags?.length - 1 && ", "}
                  </span>
                ))}
              </div>
              <div
                className={`result-expl-qa-result ${
                  ele.whetherCorrect ? "right" : "wrong"
                }`}
              >
                {ele.whetherCorrect ? "Correct" : "Incorrect"}
              </div>
              <div className="result-expl-qa-details">{ele.explanation}</div>
            </div>
          );
        })}
    </section>
  );
};

export default ResultExplanation;
