import Column from "./Column";
import { useContext } from "react";
import { DataContext } from "./Provider";
import { useNavigate } from "react-router";
import { DragDropContext } from "@hello-pangea/dnd";

/* Creates all Columns in base mode (when no routing is used) */
export default function ColumnList() {
  const [cards, setCards] = useContext(DataContext);
  const nav = useNavigate();
  // const length = cards.length;

  /* Handles the moving of items when releasing drag */
  function onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    setCards((prevCards) => {
      const newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));
      /* If user tries to move a card to a spot that is not droppable, or back to the same spot, do nothing */
      /* Remove the dragged card from its source container */
      const sourceCards = newCards[source.droppableId].cards;
      sourceCards.splice(source.index, 1);
      /* Get hold of the card that is being dragged */
      const movedItem = cards[source.droppableId].cards.filter(
        (item) =>
          !sourceCards.some(
            (sourceItem) => JSON.stringify(sourceItem) === JSON.stringify(item)
          )
      );
      /* Add the dragged item to the destination column */

      console.log(destination.droppableId);
      newCards[destination.droppableId].cards.splice(
        destination.index,
        0,
        movedItem[0]
      );

      /* Set the source column to same content but without the dragged card */
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
