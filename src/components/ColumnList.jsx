import Column from "./Column";
import { useContext } from "react";
import { DataContext } from "./Provider";
import { useNavigate } from "react-router";
import { Droppable } from "react-beautiful-dnd";

/* Creates all Columns in base mode (when no routing is used) */
export default function ColumnList() {
  const [cards, setCards] = useContext(DataContext);
  const nav = useNavigate();
  const length = cards.length;

  return (
    <>
      <section className="column-list">
        {cards.map((card, index) => (
          <Droppable key={index} droppableId={index.toString()}>
            {(provided) => (
              <div
                className="column"
                ref={provided.innerRef}
                {...provided.droppableProps}>
                <Column
                  card={card}
                  colpos={index}
                  nav={nav}
                  length={length}
                  routed={false}
                  provided={provided}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </section>
    </>
  );
}
