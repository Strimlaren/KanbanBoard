import { useContext, useState } from "react";
import { DataContext, ModalContext } from "./Provider.jsx";
import TodoCard from "./TodoCard";
import NewModal from "./NewModal.jsx";
import EditModal from "./EditModal.jsx";
import {
  AddNewIcon,
  ArrowRight,
  ArrowLeft,
  EditTitle,
} from "../assets/images/icons.jsx";

export default function Column({ card, colpos, nav, length, routed }) {
  const [
    isNewModalOpen,
    handleToggleNewModal,
    isEditModalOpen,
    handleToggleEditModal,
  ] = useContext(ModalContext);
  const [cards, setCards] = useContext(DataContext);
  const [isEditing, setIsEditing] = useState(false);

  function handleMoveColumnLeft() {
    setCards((prevCards) => {
      const newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));

      const tempColumn = newCards[colpos - 1];
      newCards[colpos - 1] = newCards[colpos];
      newCards[colpos] = tempColumn;

      return newCards;
    });
  }

  function handleMoveColumnRight() {
    setCards((prevCards) => {
      const newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));

      const tempColumn = newCards[colpos + 1];
      newCards[colpos + 1] = newCards[colpos];
      newCards[colpos] = tempColumn;

      return newCards;
    });
  }

  function handleToggleEditColumnName() {
    setIsEditing((prevState) => !prevState);
  }

  function handleUpdateTitle(e) {
    setCards((prevCards) => {
      const newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));

      newCards[colpos].columnTitle = e.target.value;
      return newCards;
    });
  }

  return (
    <>
      {isNewModalOpen && <NewModal />}
      {isEditModalOpen[0] && <EditModal />}
      <div className="column">
        <div className="column-title">
          {colpos !== 0 && !routed && !isEditing ? (
            <span
              className="column-edit-button w13"
              onClick={handleMoveColumnLeft}>
              <ArrowLeft />
            </span>
          ) : (
            <span className="column-edit-button w13"></span>
          )}
          <div>
            {isEditing ? (
              <input
                type="text"
                maxLength={15}
                className="title-edit-input"
                required
                spellCheck={false}
                value={cards[colpos].columnTitle}
                onChange={handleUpdateTitle}
              />
            ) : (
              <h2
                className={nav ? "column-title-link" : undefined}
                onClick={
                  nav ? () => nav(`/col/${card.columnTitle}`) : undefined
                }>
                {card.columnTitle}
              </h2>
            )}

            <span className="path">{`/col/${card.columnTitle}`}</span>
          </div>
          {colpos !== length - 1 && !routed && !isEditing ? (
            <span
              className="column-edit-button w13"
              onClick={handleMoveColumnRight}>
              <ArrowRight />
            </span>
          ) : (
            <span className="column-edit-button w13"></span>
          )}
          <span
            className="column-edit-button edit-title-icon"
            onClick={handleToggleEditColumnName}>
            <EditTitle />
          </span>

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
