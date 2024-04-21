import React, { useState } from "react";
import Home from '../../Components/Home';
import Quiz from "../../Components/Quiz";

import "./MainPage.scss";

const MainPage = () => {
  const [showQuizPage, setShowQuizPage] = useState(false);
  
  return (
    <div className="main-page">
      <Home showQuizPage={showQuizPage} setShowQuizPage={setShowQuizPage} />
      <Quiz showQuizPage={showQuizPage} setShowQuizPage={setShowQuizPage} />
    </div>
  );
};

export default MainPage;
