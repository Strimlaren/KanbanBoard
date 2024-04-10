import { createContext, useState, useEffect } from "react";
import { carddata } from "../assets/carddata.jsx";
import { DragDropContext } from "@hello-pangea/dnd";

export const ModalContext = createContext();
export const DataContext = createContext();
/* Provides children  with a slew of global states and functions via context */
export default function Provider({ children }) {
  /* Set the data-state (cards) to whatever is in localStorage if it exists, else use the preset tasks and columns */
  const storedCardsJSON = localStorage.getItem("data");
  const storedCards = storedCardsJSON ? JSON.parse(storedCardsJSON) : carddata;
  const [cards, setCards] = useState(storedCards);
  /* States that keep track if edit/new modals are open. */
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  /* [isopen?, card-index, col-index] */
  const [isEditModalOpen, setIsEditModalOpen] = useState([false, null, null]);

  function handleToggleNewModal() {
    setIsNewModalOpen((prevState) => !prevState);
  }
  /* Open/close edit task modal and store column positions and card array position of the card that called the function. This is used to easily fetch the correct data for editing. */
  function handleToggleEditModal(index, colpos) {
    if (index !== undefined && colpos !== undefined)
      setIsEditModalOpen((prevState) => [!prevState[0], index, colpos]);
    else setIsEditModalOpen([false, null, null]);
  }
  /* Whenever data-state is updated, save it to localStorage. */
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(cards));
  }, [cards]);

  /* Handles the moving of items when releasing drag */
  function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    if (type === "column") {
      console.log("COLUMN");
      console.log(source.index);
      console.log(destination.index);
    } else if (type === "task") {
      console.log("TASK");
      console.log(source.index);
    } else {
      console.log("NONE");
      console.log(source.index);
    }

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

      /* Checks if dragged item was a column and reorders them. */
      if (type === "column") {
        const tempColumn = newCards.splice(source.index, 1);
        newCards.splice(destination.index, 0, tempColumn[0]);

        return newCards;
      }

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
    <DragDropContext onDragEnd={onDragEnd}>
      <ModalContext.Provider
        value={[
          isNewModalOpen,
          handleToggleNewModal,
          isEditModalOpen,
          handleToggleEditModal,
          setIsEditModalOpen,
        ]}>
        <DataContext.Provider value={[cards, setCards]}>
          {children}
        </DataContext.Provider>
      </ModalContext.Provider>
    </DragDropContext>
  );
}
