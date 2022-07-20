import React, { useState } from "react";
import Game from "./Game.js";
import "./style.css";
import Modal from "./Modal.js";

function App() {
  const [highScore, setHighScore] = useState(0);
  const [hasModal, setHasModal] = useState(false);
  const [modalContent, setModalContent] = useState(``);

  const closeModal = () => {
    setHasModal(false);
  };

  const lose = (score, level) => {
    setHighScore(Math.max(highScore, score));
    setModalContent(`You lost on level ${level}! High Score: ${highScore}.`);
    setHasModal(true);
  };

  const win = (score, level) => {
    setHighScore(Math.max(highScore, score));
    setModalContent(`You beat level ${level}!`);
    setHasModal(true);
  }
  return (
    <div className="App">
      {hasModal && <Modal closeModal={closeModal}>{modalContent}</Modal>}

      <Game lose={lose} win = {win}/>
    </div>
  );
}

export default App;
