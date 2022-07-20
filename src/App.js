import React, { useState, useEffect } from "react";
import Game from "./Game.js";
import "./style.css";
import Modal from "./Modal.js";

function App() {
  const [highScore, setHighScore] = useState(0);
  const [hasModal, setHasModal] = useState(false);
  const [modalContent, setModalContent] = useState(``);
  const [lose, setLose] = useState(false);
  const [lastLevel, setLastLevel] = useState(0);
  const [lastScore, setLastScore] = useState(0);

  const closeModal = () => {
    setHasModal(false);
  };

  const loseF = (score, level) => {
    setHighScore(Math.max(highScore, score));
    setLastScore(score);
    setLastLevel(level);
    setLose(true);
  };

  const win = (score, level) => {
    setHighScore(Math.max(highScore, score));
    setLastScore(score);
    setLastLevel(level);
    setLose(false);
  };

  useEffect(() => {
    if (lose) {
      setModalContent(
        `You lost on level ${lastLevel} with ${lastScore} point${lastScore > 1 ? 's' : ''}! High Score: ${highScore}.`
      );
    } else {
      setModalContent(`You beat level ${lastLevel}!`);
    }
  }, [lose, highScore, lastLevel, lastScore]);

  useEffect(() => {
    setHasModal(true);
  }, [modalContent]);

  useEffect(() => {
    setModalContent(`Ready to play?`);
  }, [])

  return (
    <div className="App">
      <header>Memory Cards</header>
      {hasModal && <Modal closeModal={closeModal}>{modalContent}</Modal>}

      <Game lose={loseF} win={win} />
    </div>
  );
}

export default App;
