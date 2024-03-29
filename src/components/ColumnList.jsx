import { useState, createContext, useContext } from "react";
import Column from "./Column";
import { carddata } from "../assets/carddata.jsx";

export const DataContext = createContext();
export default function ColumnList() {
  const [cards, setCards] = useState(carddata);

  return (
    <>
      <DataContext.Provider value={[cards, setCards]}>
        <div className="column-list">
          {cards.map((card, index) => (
            <Column card={card} key={index} colpos={index} />
          ))}
        </div>
      </DataContext.Provider>
    </>
  );
}
