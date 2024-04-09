import Column from "./Column";
import { useContext } from "react";
import { DataContext } from "./Provider";
import { useNavigate } from "react-router";
import { DragDropContext } from "@hello-pangea/dnd";

/* Creates all Columns in base mode (when no routing is used) */
export default function ColumnList() {
  const [cards, setCards] = useContext(DataContext);
  const nav = useNavigate();
  const length = cards.length;

  /* Handles the moving of items when releasing drag */
  function onDragEnd(result) {
    setCards((prevCards) => {
      const newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));
      const { destination, source, draggableId } = result;

      if (!destination) return;
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return;

      const sourceCards = newCards[source.droppableId].cards;
      sourceCards.splice(source.index, 1);

      const movedItem = cards[source.droppableId].cards.filter(
        (item) =>
          !sourceCards.some(
            (sourceItem) => JSON.stringify(sourceItem) === JSON.stringify(item)
          )
      );
      if (newCards[destination.droppableId]) {
        console.log("Destination exists");
      } else console.log("Destination does not exist");
      if (newCards[destination.droppableId].cards.length === 0) {
        newCards[destination.droppableId].cards.push(movedItem[0]);
      } else {
        newCards[destination.droppableId].cards.splice(
          destination.index,
          0,
          movedItem[0]
        );
      }

      newCards[source.droppableId].cards = sourceCards;
      return newCards;
    });
  }

  return (
    <>
      <section className="column-list">
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
      </section>
    </>
  );
}
