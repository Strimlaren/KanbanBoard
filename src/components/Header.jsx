import { useNavigate } from "react-router";
import { useContext } from "react";
import { DataContext } from "./Provider";
import { AddColumn } from "../assets/images/icons";

export default function Header({ children }) {
  /* Used to navigate between routes. Passed down */
  const nav = useNavigate();
  const [cards, setCards] = useContext(DataContext);
  /* Adds more columns. columnIds must be unique between all currently available columns for drag and drop to work. */
  function handleAddColumn() {
    if (cards.length < 6) {
      setCards((prevCards) => {
        const newCards = prevCards.map((column) => ({
          ...column,
          cards: column.cards.map((card) => ({ ...card })),
        }));

        const newColumn = {
          columnTitle: `Col-${Date.now().toString().slice(-4)}`,
          columnId: String(newCards.length),
          cards: [],
        };

        newCards.push(newColumn);
        return newCards;
      });
    } else window.alert("Maximum allowed columns reached.");
  }
  /* Temporary resetbutton in header that clears localStorage data and refreshed page, in case dnd makes upp unusable. */
  function handleReset() {
    localStorage.removeItem("data");
    location.reload();
  }
  return (
    <header>
      <div className="header-backdrop">
        <span className="reset" onClick={handleReset}>
          R
        </span>
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
