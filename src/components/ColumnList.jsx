import Column from "./Column";
import { useContext } from "react";
import { DataContext } from "./Provider";
import { useNavigate } from "react-router";
import { Droppable } from "@hello-pangea/dnd";

/* Creates all Columns in base mode (when no routing is used) */
export default function ColumnList() {
  const [cards, setCards] = useContext(DataContext);
  const nav = useNavigate();

  return (
    <>
      <Droppable
        droppableId={"body-droppable"}
        direction="horizontal"
        type="column">
        {(provided) => (
          <section
            className="column-list"
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {cards.map((card, index) => (
              <Column
                key={index}
                card={card}
                colpos={index}
                nav={nav}
                columnId={card.columnId}
                routed={false}
              />
            ))}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </>
  );
}
