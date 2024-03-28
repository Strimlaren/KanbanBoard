import TodoCard from "./TodoCard";
import { AddNewIcon } from "../assets/images/icons.jsx";

export default function Column({ card, colpos }) {
  return (
    <>
      <div className="column">
        <div className="column-title">
          {card.columnTitle}
          {colpos === 0 && (
            <div className="add-icon">
              <AddNewIcon />
            </div>
          )}
        </div>
        <div className="cards-container">
          {card.cards.map((cardx, index) => {
            return (
              <TodoCard
                key={index}
                colpos={colpos}
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
