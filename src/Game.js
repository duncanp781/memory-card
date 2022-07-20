import React, { useState, useEffect, useCallback } from "react";
import uniqid from "uniqid";

function Game(props) {
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState({});
  const [level, setLevel] = useState(3);
  const [totalScore, setTotalScore] = useState(0);

  let { lose, win } = props;

  const reset = useCallback((lvl, newScore = 0) => {
    setLevel(lvl);
    setCards(createCards(lvl));
    setScore(newScore);
  }, []);

  const loseGame = useCallback(() => {
    lose(totalScore, level - 2);
    reset(3);
    setTotalScore(0);
  }, [totalScore, lose, reset, setTotalScore, level]);

  const onClick = (e) => {
    let target = cards[e.target.id];
    if (target.selected) {
      loseGame();
    } else {
      setScore(score + 1);
      setTotalScore(totalScore + 1);
      setCards({
        ...cards,
        [e.target.id]: {
          ...target,
          selected: true,
        },
      });
    }
  };

  useEffect(() => {
    setCards(createCards(3));
  }, []);

  useEffect(() => {
    if (score === level) {
      win(totalScore, level - 2);
      reset(level + 1, 0);
    }
  }, [score, level, win, reset, totalScore]);

  return (
    <div name="game" className="game">
      <div className="gameInfo">
        <div>Current Level: {level - 2}</div>
        <div>Current Score: {score}</div>
      </div>
      <div className="cards">
        {randomizeArray(Object.keys(cards)).map((entry) => {
          return (
            <Card
              key={entry}
              id={entry}
              number={cards[entry].number}
              onClick={onClick}
            />
          );
        })}
      </div>
    </div>
  );
}

function Card(props) {
  let { id, number, onClick } = props;
  return (
    <div className="card" id={id} onClick={onClick}>
      {number}
    </div>
  );
}

function createCards(lvl) {
  let cards = {};
  let usedNums = []
  for (let i = 0; i < lvl; i++) {
    let randInt = generateNumWithExceptions(100 + lvl*5, usedNums);
    usedNums.push(randInt);
    cards[uniqid()] = {
      number: randInt,
      selected: false,
    };
  }
  return cards;
}

function randomizeArray(arr) {
  let random = arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  return random;
}

function generateNumWithExceptions(range, usedNums) {
  while (true) {  
    let randint = Math.floor(range*(Math.random()));
    if (usedNums.includes(randint)){
      continue;
    }
    return randint;
  }
}

export default Game;
