import React from "react";
import TodoCard from "./TodoCard";

export default function Column({ card }) {
  return (
    <>
      <div className="column">
        <div className="column-title">{card.columnTitle}</div>
        <div className="cards-container">
          {card.cards.map((cardx, index) => {
            return (
              <TodoCard
                key={index}
                title={cardx.cardTitle}
                content={cardx.content}
                creator={cardx.creator}
                date={cardx.date}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
