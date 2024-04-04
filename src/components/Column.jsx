import { useContext } from "react";
import { ModalContext } from "./Provider.jsx";
import TodoCard from "./TodoCard";
import NewModal from "./NewModal.jsx";
import EditModal from "./EditModal.jsx";
import { AddNewIcon } from "../assets/images/icons.jsx";

export default function Column({ card, colpos, nav }) {
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
          <h2
            className={nav ? "column-title-link" : undefined}
            onClick={nav ? () => nav(`/col/${card.columnTitle}`) : undefined}>
            {card.columnTitle}
          </h2>
          <span className="path">{`/col/${card.columnTitle}`}</span>
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
