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

    /* If user tries to move a card to a spot that is not droppable, or back to the same spot, do nothing */
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
      /* BUG LOCATED: COLUMNS KEEP THEIR ID, BUT FUNCTION MOVES THEM ACCORDING TO INDEX ? */
      if (type === "column") {
        /* Swap positions of the relevant columns */
        const tempColumn = newCards[source.index];
        newCards[source.index] = newCards[destination.index];
        newCards[destination.index] = tempColumn;
        /* Switch the columns ids */
        const tempId = String(newCards[source.index].columnId);
        newCards[source.index].columnId = newCards[destination.index].columnId;
        newCards[destination.index].columnId = tempId;
        return newCards;
      }
      /* If the dragged item is not a column, it is a task. Switch places with relevant tasks. */
      const tempCard = newCards[source.droppableId].cards.splice(
        source.index,
        1
      );

      newCards[destination.droppableId].cards.splice(
        destination.index,
        0,
        tempCard[0]
      );
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
