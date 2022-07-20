import React, { useState, useEffect, useCallback } from "react";
import uniqid from "uniqid";

function Game(props) {
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState({});
  const [level, setLevel] = useState(3);
  const [totalScore, setTotalScore] = useState(0);

  const reset = useCallback((lvl, newScore = 0) => {
    setLevel(lvl);
    setCards(createCards(lvl));
    setScore(newScore);
  }, []);

  const lose = () => {
    props.lose(totalScore, level - 2);
    reset(3);
    setTotalScore(0);
  };

  const onClick = (e) => {
    let target = cards[e.target.id];
    if (target.selected) {
      lose();
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
      props.win(totalScore, level - 2);
      reset(level + 1, 0);
    }
  }, [score, level, props, reset, totalScore]);

  return (
    <div name="game" className="game">
      <div>Current Level: {level - 2}</div>
      <div>Current Score: {score}</div>
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
  for (let i = 0; i < lvl; i++) {
    cards[uniqid()] = {
      number: i + 1,
      selected: false,
    };
  }
  return cards;
}

function randomizeArray(arr) {
  let random = arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  return random;
}

export default Game;
