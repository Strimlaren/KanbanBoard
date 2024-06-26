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
import { useNavigate } from "react-router-dom";
import { Draggable } from "@hello-pangea/dnd";

/* Creates each todo-task */
export default function TodoCard({ index, colpos, id }) {
  const [cards, setCards] = useContext(DataContext);
  const [
    isNewModalOpen,
    handleToggleNewModal,
    isEditModalOpen,
    handleToggleEditModal,
  ] = useContext(ModalContext);
  const nav = useNavigate();
  /* Filters unwanted todo-card from the array of cards. */
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
  /* Move card to column on the right. */
  function handleMoveCardTo(direction) {
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

      if (direction === "right") {
        if (colpos + 1 < cards.length)
          newCards[colpos + 1].cards.push(targetedCard[0]);
      } else newCards[colpos - 1].cards.push(targetedCard[0]);

      return newCards;
    });
  }
  /* Open the edit modal. */
  function handleEdit() {
    handleToggleEditModal(index, colpos);
  }
  /* Moves card down in the same column. */
  function handleMoveDown() {
    setCards((prevCards) => {
      const newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));

      const tempCard = newCards[colpos].cards[index + 1];
      newCards[colpos].cards[index + 1] = newCards[colpos].cards[index];
      newCards[colpos].cards[index] = tempCard;

      return newCards;
    });
  }
  /* Moves card up in the same column. */
  function handleMoveUp() {
    setCards((prevCards) => {
      const newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));

      const tempCard = newCards[colpos].cards[index - 1];
      newCards[colpos].cards[index - 1] = newCards[colpos].cards[index];
      newCards[colpos].cards[index] = tempCard;

      return newCards;
    });
  }

  return (
    <>
      <Draggable draggableId={id} index={index} key={id}>
        {(provided) => {
          return (
            <div
              className="todo-card"
              ref={provided.innerRef}
              {...provided.draggableProps}>
              <div className="lateral-icons-container">
                {index === 0 ? (
                  <span className="arrow-height"></span>
                ) : (
                  <span onClick={handleMoveUp} className="arrow-height">
                    <ArrowUp />
                  </span>
                )}
                {index > cards[colpos].cards.length ||
                index === cards[colpos].cards.length - 1 ? (
                  <span className="arrow-height"></span>
                ) : (
                  <span onClick={handleMoveDown} className="arrow-height">
                    <ArrowDown />
                  </span>
                )}
              </div>
              <div {...provided.dragHandleProps}>
                <h3
                  className="column-title-link"
                  onClick={() => nav(`/${cards[colpos].cards[index].id}`)}>
                  {cards[colpos].cards[index].cardTitle}
                </h3>
                <div className="p-content-div">
                  <p>{cards[colpos].cards[index].content}</p>
                </div>
              </div>
              <div className="card-footer">
                <p>
                  <span
                    className={
                      cards[colpos].cards[index].edited ? "edited" : "unedited"
                    }>
                    {cards[colpos].cards[index].edited ? "Edited " : "Added "}
                  </span>{" "}
                  {cards[colpos].cards[index].date} by{" "}
                  <span className="highlight">
                    {cards[colpos].cards[index].creator}
                  </span>
                </p>
                <div className="icon-container">
                  {colpos !== 0 && (
                    <span
                      className="left-icon"
                      onClick={() => handleMoveCardTo("left")}>
                      <ReturnIcon />
                    </span>
                  )}
                  <span onClick={handleDelete}>
                    <TrashIcon />
                  </span>
                  <span onClick={handleEdit}>
                    <EditIcon />
                  </span>
                  <span
                    className="right-icon"
                    onClick={() => handleMoveCardTo("right")}>
                    <DoneIcon />
                  </span>
                </div>
              </div>
            </div>
          );
        }}
      </Draggable>
    </>
  );
}
