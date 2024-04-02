import Column from "./Column";
import { useContext } from "react";
import { DataContext } from "./Provider";

export default function ColumnList() {
  const [cards, setCards] = useContext(DataContext);

  return (
    <>
      <section className="column-list">
        {cards.map((card, index) => (
          <Column card={card} key={index} colpos={index} />
        ))}
      </section>
    </>
  );
}
