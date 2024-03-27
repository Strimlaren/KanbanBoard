import React from "react";
import { useState } from "react";
import TodoCard from "./TodoCard";
import { carddata } from "../assets/carddata.jsx";

export default function Column({ title }) {
  const [cards, setCards] = useState(carddata);

  const columnCards = cards.filter((card) => card.columnTitle === title);

  return (
    <>
      <div className="column">
        <div className="column-title">{columnCards[0].columnTitle}</div>
        <div className="cards-container">
          {columnCards[0].cards.map((card, index) => {
            return (
              <TodoCard
                key={index}
                title={card.cardTitle}
                content={card.content}
                creator={card.creator}
                date={card.date}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
