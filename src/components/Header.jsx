import { useNavigate } from "react-router";
import { useContext } from "react";
import { DataContext } from "./Provider";
import { AddColumn } from "../assets/images/icons";

export default function Header({ children }) {
  const nav = useNavigate();
  const [cards, setCards] = useContext(DataContext);

  function handleAddColumn() {
    if (cards.length < 6) {
      setCards((prevCards) => {
        const newCards = prevCards.map((column) => ({
          ...column,
          cards: column.cards.map((card) => ({ ...card })),
        }));

        const newColumn = {
          columnTitle: `Column ${Date.now()}`,
          cards: [],
        };

        newCards.push(newColumn);
        console.log(newCards);
        return newCards;
      });
    } else window.alert("Maximum allowed columns reached.");
  }

  return (
    <header>
      <div className="header-backdrop">
        <h1 className="column-title-link" onClick={() => nav("/")}>
          {children}
        </h1>
        <span className="add-column-button" onClick={handleAddColumn}>
          <AddColumn />
        </span>
      </div>
    </header>
  );
}
