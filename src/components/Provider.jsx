import { createContext, useState, useEffect } from "react";
import { carddata } from "../assets/carddata.jsx";

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

  return (
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
  );
}
