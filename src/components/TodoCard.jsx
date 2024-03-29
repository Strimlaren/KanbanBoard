import {
  TrashIcon,
  EditIcon,
  DoneIcon,
  ReturnIcon,
} from "../assets/images/icons.jsx";
import { useContext } from "react";
import { DataContext } from "./ColumnList.jsx";

export default function TodoCard({ index, colpos }) {
  const [cards, setCards] = useContext(DataContext);

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

      console.log(newCards);
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
      console.log(targetedCard);
      let filteredColumnCards = newCards[colpos].cards.filter(
        (_, i) => i !== index
      );
      newCards[colpos].cards = filteredColumnCards;

      if (colpos + 1 < cards.length)
        newCards[colpos + 1].cards.push(targetedCard[0]);

      return newCards;
    });
  }

  return (
    <div className="todo-card">
      <h3>{cards[colpos].cards[index].cardTitle}</h3>
      <div className="p-content-div">
        <p>{cards[colpos].cards[index].content}</p>
      </div>
      <div className="card-footer">
        <p>
          Added {cards[colpos].cards[index].date} by{" "}
          <span className="highlight">
            {cards[colpos].cards[index].creator}
          </span>
        </p>
        <div className="icon-container">
          {colpos !== 0 && (
            <span className="left-icon">
              <ReturnIcon />
            </span>
          )}
          <span onClick={handleDelete}>
            <TrashIcon />
          </span>
          <EditIcon />
          <span className="right-icon" onClick={handleMoveRight}>
            <DoneIcon />
          </span>
        </div>
      </div>
    </div>
  );
}
