import { useState } from "react";
import Column from "./Column";

import { carddata } from "../assets/carddata.jsx";

export default function ColumnList() {
  const [cards, setCards] = useState(carddata);

  return (
    <>
      <div className="column-list">
        {cards.map((card, index) => (
          <Column card={card} key={index} colpos={index} />
        ))}
      </div>
    </>
  );
}
