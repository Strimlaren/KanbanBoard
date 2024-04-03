import Column from "./Column";
import { useContext } from "react";
import { DataContext } from "./Provider";

export default function ColumnList() {
  const [cards, setCards] = useContext(DataContext);

  return (
    <>
      <section className="column-list">
        {cards.map((card, index) => (
          <Column key={index} card={card} colpos={index} />
        ))}
      </section>
    </>
  );
}
