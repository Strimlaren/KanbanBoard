import { useState } from "react";
import TodoCard from "./TodoCard";
import NewEditModal from "./NewEditModal.jsx";
import { AddNewIcon } from "../assets/images/icons.jsx";

export default function Column({ card, colpos }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClickNew() {
    setIsModalOpen(true);
  }

  return (
    <>
      {isModalOpen && <NewEditModal />}
      <div className="column">
        <div className="column-title">
          {card.columnTitle}
          {colpos === 0 && (
            <div className="add-icon">
              <span onClick={handleClickNew}>
                <AddNewIcon />
              </span>
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
