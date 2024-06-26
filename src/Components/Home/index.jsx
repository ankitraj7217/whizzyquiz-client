import React, { useState } from "react";
import CustomButton from "../CustomButton";
import Instructions from "../Instructions";
import { quizHomeIntro } from "../../Utils/Data/quizData";

import "./Home.scss";

const Home = ({ showQuizPage, setShowQuizPage, isDesktopScreen }) => {
  const [instrActive, setInstrActive] = useState(false);

  return (
    <section
      className="home"
      style={{
        left: showQuizPage && isDesktopScreen ? "50%" : "0%",
        top: showQuizPage && !isDesktopScreen ? "-50%" : "0%",
      }}
    >
      <header className="home-header">Home</header>
      <main className="home-main">
        <h2>Welcome to WhizzyQuiz</h2>
        <h4>{quizHomeIntro}</h4>
        <div className="home-start">
          <CustomButton
            bgColor="#0d0de7"
            txtColor="#fff"
            hoverBgColor="#09001d"
            hovertxtColor="#fff"
            border="2px solid #fff"
            borderRadius="0.5rem"
            boxShadow="0 0 10px #0d0de7"
            txt="Start Quiz"
            onClickFunc={() => setInstrActive(true)}
          />
        </div>
        <Instructions
          isActive={instrActive}
          setIsActive={setInstrActive}
          setShowQuiz={setShowQuizPage}
        />
      </main>
    </section>
  );
};

export default Home;
