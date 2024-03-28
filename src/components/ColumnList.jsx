import Column from "./Column";
import { useState } from "react";
import { carddata } from "../assets/carddata.jsx";

export default function ColumnList() {
  const [cards, setCards] = useState(carddata);

  return (
    <>
      <div className="column-list">
        {cards.map((card, index) => (
          <Column card={card} key={index} />
        ))}
      </div>
    </>
  );
}
