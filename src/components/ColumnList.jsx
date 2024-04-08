import Column from "./Column";
import { useContext } from "react";
import { DataContext } from "./Provider";
import { useNavigate } from "react-router";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

/* Creates all Columns in base mode (when no routing is used) */
export default function ColumnList() {
  const [cards, setCards] = useContext(DataContext);
  const nav = useNavigate();
  const length = cards.length;

  function onDragEnd(result) {}

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
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
      </DragDropContext>
    </>
  );
}
