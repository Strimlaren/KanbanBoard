import { useContext } from "react";
import { DataContext, ModalContext } from "../App.jsx";
import TodoCard from "./TodoCard";
import { NewModal } from "./NewEditModal.jsx";
import { EditModal } from "./EditModal.jsx";
import { AddNewIcon } from "../assets/images/icons.jsx";

export default function Column({ card, colpos }) {
  // const [cards, setCards] = useContext(DataContext);
  const [
    isNewModalOpen,
    handleToggleNewModal,
    isEditModalOpen,
    handleToggleEditModal,
  ] = useContext(ModalContext);

  return (
    <>
      {isNewModalOpen && <NewModal />}
      {isEditModalOpen[0] && <EditModal />}
      <div className="column">
        <div className="column-title">
          {card.columnTitle}
          {colpos === 0 && (
            <div className="add-icon">
              <span onClick={handleToggleNewModal}>
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
                index={index}
                colpos={colpos}
                title={cardx.cardTitle}
                content={cardx.content}
                creator={cardx.creator}
                date={cardx.date}
                edited={false}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
