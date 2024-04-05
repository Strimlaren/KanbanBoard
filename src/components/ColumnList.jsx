import Column from "./Column";
import { useContext } from "react";
import { DataContext } from "./Provider";
import { useNavigate } from "react-router";

export default function ColumnList() {
  const [cards, setCards] = useContext(DataContext);
  const nav = useNavigate();
  const length = cards.length;

  return (
    <>
      <section className="column-list">
        {cards.map((card, index) => (
          <Column
            key={index}
            card={card}
            colpos={index}
            nav={nav}
            length={length}
            routed={false}
          />
        ))}
      </section>
    </>
  );
}
