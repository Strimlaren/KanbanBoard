import {
  TrashIcon,
  EditIcon,
  DoneIcon,
  ReturnIcon,
  ArrowUp,
  ArrowDown,
} from "../assets/images/icons.jsx";
import { useContext } from "react";
import { DataContext, ModalContext } from "./Provider.jsx";

export default function TodoCard({ index, colpos }) {
  const [cards, setCards] = useContext(DataContext);
  const [
    isNewModalOpen,
    handleToggleNewModal,
    isEditModalOpen,
    handleToggleEditModal,
  ] = useContext(ModalContext);

  function handleDelete() {
    setCards((prevCards) => {
      const newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));

      const filteredColumnCards = newCards[colpos].cards.filter(
        (_, i) => i !== index
      );
      newCards[colpos].cards = filteredColumnCards;
      return newCards;
    });
  }

  function handleMoveRight() {
    setCards((prevCards) => {
      let newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));

      let targetedCard = newCards[colpos].cards.filter((_, i) => i === index);

      let filteredColumnCards = newCards[colpos].cards.filter(
        (_, i) => i !== index
      );
      newCards[colpos].cards = filteredColumnCards;

      if (colpos + 1 < cards.length)
        newCards[colpos + 1].cards.push(targetedCard[0]);

      return newCards;
    });
  }

  function handleMoveLeft() {
    setCards((prevCards) => {
      let newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));

      let targetedCard = newCards[colpos].cards.filter((_, i) => i === index);

      let filteredColumnCards = newCards[colpos].cards.filter(
        (_, i) => i !== index
      );
      newCards[colpos].cards = filteredColumnCards;

      newCards[colpos - 1].cards.push(targetedCard[0]);

      return newCards;
    });
  }

  function handleEdit() {
    handleToggleEditModal(index, colpos);
  }

  function handleMoveDown() {}

  function handleMoveUp() {}

  return (
    <>
      <div className="todo-card">
        <div className="lateral-icons-container">
          {index === 0 ? (
            <span className="arrow-height"></span>
          ) : (
            <span onClick={handleMoveDown} className="arrow-height">
              <ArrowUp />
            </span>
          )}
          {index > cards[colpos].cards.length ||
          index === cards[colpos].cards.length - 1 ? (
            <span className="arrow-height"></span>
          ) : (
            <span onClick={handleMoveUp} className="arrow-height">
              <ArrowDown />
            </span>
          )}
        </div>
        <h3>{cards[colpos].cards[index].cardTitle}</h3>
        <div className="p-content-div">
          <p>{cards[colpos].cards[index].content}</p>
        </div>
        <div className="card-footer">
          <p>
            {cards[colpos].cards[index].edited ? "Edited " : "Added "}{" "}
            {cards[colpos].cards[index].date} by{" "}
            <span className="highlight">
              {cards[colpos].cards[index].creator}
            </span>
          </p>
          <div className="icon-container">
            {colpos !== 0 && (
              <span className="left-icon" onClick={handleMoveLeft}>
                <ReturnIcon />
              </span>
            )}
            <span onClick={handleDelete}>
              <TrashIcon />
            </span>
            <span onClick={handleEdit}>
              <EditIcon />
            </span>
            <span className="right-icon" onClick={handleMoveRight}>
              <DoneIcon />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
