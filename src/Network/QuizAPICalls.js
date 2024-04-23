import { getAnswersAPI, getRandomQuestionsAPI } from "../config";
import { handleGetAPICall, handlePostAPICall } from "./GenericAPICalls";

export const getRandomQuestions = async () => {
  try {
    const data = await handleGetAPICall(getRandomQuestionsAPI);

    const formattedQuestions = data?.map((ele) => {
      return {
        questionId: ele.id,
        question: ele.question,
        options: ele.options.map(
          (option) => `${option.optionIdx}. ${option.optionVal}`
        ),
      };
    });

    return formattedQuestions;
  } catch (e) {
    console.error("Error while fetching random questions: ", e);
  }
};

// selectedoptions will have {[questionId]: selectedOption}
export const getFinalResult = async (dataObj, selectedOptions) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const data = await handlePostAPICall(getAnswersAPI, {}, headers, dataObj);

    // [{question, whetherCorrect, correctOption explanation, tags}]
    let correctCnt = 0;
    const explanationDetails = [];

    data?.forEach((answer) => {
      // Don't use ?., such that to track if any option is not present.
      // answer.id is questionId
      let whetherCorrect = false;
      if (answer.correctOption.optionIdx - 1 === selectedOptions[answer.id]) {
        correctCnt++;
        whetherCorrect = true;
      }
      explanationDetails.push({
        questionId: answer.id,
        question: answer.question,
        whetherCorrect: whetherCorrect,
        explanation: answer.explanation,
        tags: answer.tags,
      });
    });

    return { correctCnt, explanationDetails };
  } catch (e) {
    console.error("Error while fetching final result: ", e);
  }
};
