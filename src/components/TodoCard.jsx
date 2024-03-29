import {
  TrashIcon,
  EditIcon,
  DoneIcon,
  ReturnIcon,
} from "../assets/images/icons.jsx";
import { useContext } from "react";
import { DataContext } from "./ColumnList.jsx";

export default function TodoCard({
  index,
  colpos,
  title,
  content,
  creator,
  date,
}) {
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

  return (
    <div className="todo-card">
      <h3>{title}</h3>
      <div className="p-content-div">
        <p>{content}</p>
      </div>
      <div className="card-footer">
        <p>
          Added {date} by <span className="highlight">{creator}</span>
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
          <span className="right-icon">
            <DoneIcon />
          </span>
        </div>
      </div>
    </div>
  );
}
