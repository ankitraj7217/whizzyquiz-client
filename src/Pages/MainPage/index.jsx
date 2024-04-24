import React, { useState } from "react";
import Home from '../../Components/Home';
import Quiz from "../../Components/Quiz";

import "./MainPage.scss";

const MainPage = () => {
  const [showQuizPage, setShowQuizPage] = useState(false);
  const isDesktopScreen = window.innerWidth > 720;
  
  return (
    <div className="main-page">
      <Home showQuizPage={showQuizPage} setShowQuizPage={setShowQuizPage} isDesktopScreen={isDesktopScreen} />
      <Quiz showQuizPage={showQuizPage} setShowQuizPage={setShowQuizPage} isDesktopScreen={isDesktopScreen} />
    </div>
  );
};

export default MainPage;
